import pandas as pd
import numpy as np
from tqdm import tqdm
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    archivo_excel = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\BASE_DIRECCIONES.xlsx'
    archivo_excel_2 = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\Nomenclatura_Direciones.xlsx'

    df = pd.read_excel(archivo_excel, sheet_name='PDV')
    df_2 = pd.read_excel(archivo_excel_2, sheet_name='Nomenclatura')

    if 'DIRECCION' not in df.columns:
        raise KeyError('La columna "DIRECCION" no está presente en el DataFrame.')

    ##################################### Formatear Direcciones #####################################

    direccion_pdv = df['DIRECCION'].str.strip().str.upper()

    direccion = df_2['DIRECCION'].str.upper().values
    nomenclatura = df_2['NOMENCLATURA'].str.upper().values

    for i in tqdm(range(len(direccion)), desc='Ajustando Nomenclatura de las Direcciones'):
        direccion_pdv = direccion_pdv.str.replace(direccion[i], nomenclatura[i], regex=False)

    df['DIRECCION_ARREGLADA'] = direccion_pdv.str.strip()

    ##################################### Coordenadas de Direcciones #####################################

    def obtener_coordenadas(api_key, direccion):
        base_url = "https://maps.googleapis.com/maps/api/geocode/json"
        parametros = {"address": direccion, "key": api_key}

        respuesta = requests.get(base_url, params=parametros)
        datos = respuesta.json()

        if datos["status"] == "OK" and datos.get("results"):
            coordenadas = datos["results"][0]["geometry"]["location"]
            latitud = coordenadas["lat"]
            longitud = coordenadas["lng"]
            return latitud, longitud
        else:
            return None, None

    clave_api = 'AIzaSyAKbPDjckorVSxK30UTc10naoXgscO1jmU'
    direcciones_completas = df['DIRECCION_ARREGLADA'] + ',' + df['CIUDAD'] + ',' + df['PAIS']

    # Función para manejar solicitudes en paralelo
    def obtener_coordenadas_para_direccion(direccion):
        return obtener_coordenadas(clave_api, direccion)

    coordenadas_list = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_direccion = {executor.submit(obtener_coordenadas_para_direccion, direccion): direccion for direccion in direcciones_completas}
        for future in tqdm(as_completed(future_to_direccion), total=len(future_to_direccion), desc='Obteniendo Coordenadas'):
            try:
                coordenadas_list.append(future.result())
            except Exception as e:
                coordenadas_list.append((None, None))
                print(f"Error al obtener coordenadas para {future_to_direccion[future]}: {e}")

    df[['LATITUD_PDV', 'LONGITUD_PDV']] = pd.DataFrame(coordenadas_list, index=df.index)

except FileNotFoundError as e:
    print(f"Error: {e}")

except KeyError as e:
    print(f"Error: {e}")

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}: {e}")

else:
    df.to_excel(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python\Direcciones_Ajustadas.xlsx', sheet_name='Direcciones_PDV')
