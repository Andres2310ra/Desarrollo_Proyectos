import requests
import pandas as pd
import pytz
from datetime import datetime

# === Credenciales Zoho ===
client_id = '1000.FYKV6T7LZQLYEGNAN6V254VRKXNZAH'
client_secret = '14e7664eb80c311cfcbaf03d95614f6ab92a1bfa6f'
refresh_token = '1000.1120a9a420defe88dfc3917ebb313181.693e286b3909e54ccfc14d70cc2fa808'
token_url = 'https://accounts.zoho.com/oauth/v2/token'

# === Función para obtener access_token ===
def get_zoho_access_token(client_id, client_secret, refresh_token, token_url):
    payload = {
        'grant_type': 'refresh_token',
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post(token_url, data=payload, headers=headers)
    response.raise_for_status()
    token_data = response.json()
    return token_data['access_token']

# === Obtener access_token ===
access_token = get_zoho_access_token(client_id, client_secret, refresh_token, token_url)
print("🔐 Access Token obtenido correctamente.")

# === Configurar fechas con zona horaria Bogotá ===
zona = pytz.timezone('America/Bogota')
fecha_inicio_dt = zona.localize(pd.to_datetime('2025-01-01'))
fecha_fin_dt = zona.localize(pd.to_datetime(datetime.now()))

# === Consulta paginada de usuarios Zoho CRM v3 ===
users_url = 'https://www.zohoapis.com/crm/v3/users'
users_headers = {
    'Authorization': f'Zoho-oauthtoken {access_token}'
}

all_users = []
page = 1
per_page = 200  # máximo permitido por Zoho

while True:
    users_params = {
        'type': 'AllUsers',
        'page': page,
        'per_page': per_page
    }
    users_response = requests.get(users_url, headers=users_headers, params=users_params)
    print(f"Página: {page}, Status code: {users_response.status_code}")
    users_response.raise_for_status()
    users_data = users_response.json().get('users', [])
    if not users_data:
        break
    all_users.extend(users_data)
    if len(users_data) < per_page:
        break
    page += 1

df_users = pd.json_normalize(all_users)

# ========== Filtrar y formatear datos ==========

# Filtrar columnas deseadas
columnas_deseadas = ['id', 'full_name','email','profile.id','profile.name','role.id','role.name','country_locale','created_time','Modified_Time','status']

# Asegurarse de que las columnas deseadas estén en el DataFrame
df_users = df_users[[col for col in columnas_deseadas if col in df_users.columns]]

# # Filtrar por nombre de perfil
# df_users = df_users[df_users['profile.name'].str.contains('comercial|Sales', case=False, na=False)]

# Filtrar por nombre de rol
df_users = df_users[df_users['role.name'].str.contains('Sales executive center zone|Sales executive south zone|Sales Manager south Zone|Sales director center zone|Sales coordinator center zone', case=False, na=False)]

# Formatear la columna 'created_time' al formato dd/MM/yyyy HH:MM:SS
if 'created_time' in df_users.columns:
    df_users['created_time'] = pd.to_datetime(df_users['created_time'], errors='coerce').dt.strftime('%d/%m/%Y %H:%M:%S')

# Formatear la columna 'Modified_Time' al formato dd/MM/yyyy HH:MM:SS
if 'Modified_Time' in df_users.columns:
    df_users['Modified_Time'] = pd.to_datetime(df_users['Modified_Time'], errors='coerce').dt.strftime('%d/%m/%Y %H:%M:%S')

# Lógica para dejar solo el registro correcto por email
def seleccionar_registro(grupo):
    # Prioridad: active > disabled > deleted (más reciente)
    if (grupo['status'] == 'active').any():
        return grupo[grupo['status'] == 'active'].sort_values('Modified_Time').iloc[-1]
    elif (grupo['status'] == 'disabled').any():
        return grupo[grupo['status'] == 'disabled'].sort_values('Modified_Time').iloc[-1]
    else:
        return grupo.sort_values('Modified_Time').iloc[-1]

if 'email' in df_users.columns and 'status' in df_users.columns and 'Modified_Time' in df_users.columns:
    df_users = df_users.sort_values('Modified_Time')
    df_users = df_users.groupby('email', as_index=False).apply(seleccionar_registro).reset_index(drop=True)

# Separar los registros del director para aplicar el filtro de estado
if 'role.name' in df_users.columns and 'status' in df_users.columns:
    directores = df_users[df_users['role.name'].str.contains('Sales Manager south Zone|Sales director center zone', case=False, na=False)]
    directores = directores[directores['status'] == 'active']

    # Filtrar el resto de usuarios distintos al director
    otros_roles = df_users[~df_users['role.name'].str.contains('Sales Manager south Zone|Sales director center zone', case=False, na=False)]

    # Unir ambos resultados
    df_users = pd.concat([otros_roles, directores], ignore_index=True)

# Agregar columna 'zona' según el valor de 'role.name'
df_users['zona'] = df_users['role.name'].apply(
    lambda x: 'Center Zone' if x == 'Sales executive center zone'
    else 'Center Zone' if x == 'Sales coordinator center zone'
    else 'South Zone' if x == 'Sales executive south zone'
    else 'EFF Zone' if x == 'Sales executive EFF'
    else 'South Zone' if x == 'Sales Manager south Zone'
    else 'Center Zone' if x == 'Sales director center zone'
    else ''
)

# Agregar columna 'id_top' según el valor de 'role.name'

# Obtener el ID del Sales director zone
id_director_center = df_users[df_users['role.name'] == 'Sales director center zone']['id']
id_director_center = id_director_center.iloc[0] if not id_director_center.empty else '0'

id_director_south = df_users[df_users['role.name'] == 'Sales Manager south Zone']['id']
id_director_south = id_director_south.iloc[0] if not id_director_south.empty else '0'

df_users['Pid'] = df_users.apply(
    lambda row: id_director_center if row['role.name'] == 'Sales executive center zone'
    else id_director_south if row['role.name'] == 'Sales executive south zone'
    else id_director_center if row['id'] == '4294441000057464340'
    else '0',
    axis=1
)

df_users
# df_users.to_excel('usuarios_zoho_3.xlsx', index=False)