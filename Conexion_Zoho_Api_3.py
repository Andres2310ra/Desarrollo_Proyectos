import requests
import pandas as pd
import pytz
from datetime import datetime

# === Credenciales Zoho ===
client_id = '1000.FYKV6T7LZQLYEGNAN6V254VRKXNZAH'
client_secret = '14e7664eb80c311cfcbaf03d95614f6ab92a1bfa6f'
refresh_token = '1000.1120a9a420defe88dfc3917ebb313181.693e286b3909e54ccfc14d70cc2fa808'
token_url = 'https://accounts.zoho.com/oauth/v2/token'

# === Función para obtener token de acceso ===
def get_zoho_access_token(client_id, client_secret, refresh_token, token_url):
    payload = {
        'grant_type': 'refresh_token',
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post(token_url, data=payload, headers=headers)
    
    if response.status_code != 200:
        print("❌ Error autenticando en Zoho:", response.text)
        response.raise_for_status()

    token_data = response.json()
    return token_data['access_token']

# === Obtener access_token ===
access_token = get_zoho_access_token(client_id, client_secret, refresh_token, token_url)
print("🔐 Access Token obtenido correctamente.")

# === Consulta paginada al módulo 'Deals' ===
users_url = 'https://www.zohoapis.com/crm/v2/Deals'
users_headers = {
    'Authorization': f'Zoho-oauthtoken {access_token}'
}

All_Modulo = []
page = 1
per_page = 200  # máximo permitido por Zoho

while True:
    users_params = {
        'type': 'AllDeals',
        'page': page,
        'per_page': per_page
    }
    response = requests.get(users_url, headers=users_headers, params=users_params)
    print(f"📄 Página: {page} - Código de estado: {response.status_code}")
    response.raise_for_status()

    data = response.json().get('data', [])
    if not data:
        break

    All_Modulo.extend(data)

    if len(data) < per_page:
        break
    page += 1

print(f"✅ Total de registros descargados: {len(All_Modulo)}")

# === Convertir a DataFrame ===
df_modulo = pd.json_normalize(All_Modulo)

# === Procesamiento de fecha ===
if 'Created_Time' not in df_modulo.columns:
    print("⚠️ El campo 'Created_Time' no está presente en los registros.")
else:
    # Convertir a datetime y aplicar zona horaria
    df_modulo['Created_Time'] = pd.to_datetime(df_modulo['Created_Time'], errors='coerce')
    zona = pytz.timezone('America/Bogota')
    
    # Definir rango de fechas
    fecha_inicio = zona.localize(pd.to_datetime('2025-01-01'))
    fecha_fin = zona.localize(pd.to_datetime(datetime.now()))
    
    # Filtrar fechas
    df_modulo = df_modulo[
        (df_modulo['Created_Time'] >= fecha_inicio) &
        (df_modulo['Created_Time'] <= fecha_fin)
    ]

    # Quitar la zona horaria para exportar
    df_modulo['Created_Time'] = df_modulo['Created_Time'].dt.tz_localize(None)

# === Exportar a Excel con timestamp ===
nombre_archivo = f"Modulo_zoho2_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
df_modulo.to_excel(nombre_archivo, index=False)
print(f"📁 Datos exportados a '{nombre_archivo}' correctamente.")
