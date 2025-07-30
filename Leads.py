#!/usr/bin/env python3
import time, io
from urllib.parse import quote_plus
import pandas as pd, requests
from datetime import datetime

# ------------------------------------------------------------------
# 1) CONFIGURACIÓN GENERAL
# ------------------------------------------------------------------
OWNER_EMAIL = "it@econtainers.co"        # Propietario del workspace
WORKSPACE   = "Zoho CRM"                 # Nombre exacto del workspace
VIEW        = "Posibles clientes"        # Tabla o vista a exportar
DC_DOMAIN   = "analyticsapi.zoho.com"    # Cambia a .eu, .in, etc. si aplica

# Credenciales OAuth
CLIENT_ID     = "1000.U6OSWPJCQI8DETIAE63MD8ARYG7LNH"
CLIENT_SECRET = "07bf731214b27dd07604231e6cef1b35d35221aa53"
REFRESH_TOKEN = "1000.949095f29f02a8ba8a358ef535e56955.918b607001c00f894d5fcef1ef8bf25b"
TOKEN_URL     = "https://accounts.zoho.com/oauth/v2/token"

# ------------------------------------------------------------------
# 2) FUNCIÓN PARA RENOVAR EL TOKEN
# ------------------------------------------------------------------
def get_zoho_access_token() -> str:
    payload = {
        "grant_type":    "refresh_token",
        "client_id":     CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "refresh_token": REFRESH_TOKEN,
    }
    resp = requests.post(TOKEN_URL, data=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()["access_token"]

# ------------------------------------------------------------------
# 3) LLAMADA A ZOHO ANALYTICS → BYTES CSV
# ------------------------------------------------------------------
def fetch_page(token: str, workspace: str, view: str, params: dict) -> bytes:
    base = (
        f"https://{DC_DOMAIN}/api/{OWNER_EMAIL}/"
        f"{quote_plus(workspace)}/{quote_plus(view)}"
    )
    resp = requests.get(
        base,
        headers={"Authorization": f"Zoho-oauthtoken {token}"},
        params=params,
        timeout=360,
    )
    resp.raise_for_status()
    return resp.content   # ⬅️  bytes del CSV

# ------------------------------------------------------------------
# 4) FUNCIÓN PRINCIPAL
# ------------------------------------------------------------------
def zoho_to_df(workspace: str, view: str, sql_where: str | None = None) -> pd.DataFrame:
    token = get_zoho_access_token()

    params = {
        "ZOHO_ACTION":        "EXPORT",
        "ZOHO_OUTPUT_FORMAT": "CSV",
        "ZOHO_API_VERSION":   "1.0",
        "ZOHO_ERROR_FORMAT":  "JSON",
    }

    sql_where = '"Hora de creación" >= \'2025-01-01 00:00:00\''

    if sql_where:
        params["ZOHO_SQLQUERY"] = f'select * from "{view}" where {sql_where}'

    frames, page = [], 1
    while True:
        params["ZOHO_PAGE"] = page
        csv_bytes = fetch_page(token, workspace, view, params)
        # df_page   = pd.read_csv(io.BytesIO(csv_bytes), encoding="utf-8")
        df_page = pd.read_csv(io.BytesIO(csv_bytes), encoding="utf-8", dtype={"Id": str, "Propietario de Posible cliente": str, "Creado por": str, "Converted Account": str, "Converted Contact": str, "Modificado por": str, "Converted Deal": str, "Diseño": str})
        frames.append(df_page)

        if len(df_page) < 100_000:      # última página
            break
        page += 1
        time.sleep(1.1)                 # evita rate-limit

    return pd.concat(frames, ignore_index=True)

# ------------------------------------------------------------------
# 5) TRANSFORMACIÓN DE DATOS
# ------------------------------------------------------------------

df = zoho_to_df(WORKSPACE, VIEW)

# # Transformas Colimnas a Texto
# for col in ["Id", "Converted Contact"]:
#     if col in df.columns:
#         df[col] = df[col].astype(str)

# df['Id'] = df['Id'].str.lstrip('#')


# ------------------------------------------------------------------
# 6) EJECUCIÓN DIRECTA
# ------------------------------------------------------------------

df

if __name__ == "__main__":
    print("🔄 Descargando datos desde Zoho Analytics…")
    df = zoho_to_df(WORKSPACE, VIEW)

    print(f"✅ Descarga completada. Filas: {len(df)}")

    # Ejemplo de conversión de fecha si existe esa columna
    if "Created_Time" in df.columns:
        df["Created_Time"] = pd.to_datetime(df["Created_Time"], errors="coerce", dayfirst=True)

    output_file = f"{VIEW} {pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
    df.to_excel(output_file, index=False)
    print(f"📁 Datos guardados en {output_file}")
