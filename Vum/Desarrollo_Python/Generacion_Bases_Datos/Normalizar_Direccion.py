import pandas as pd
import numpy as np
from tqdm import tqdm  # Importa la librería tqdm para la barra de progreso
import requests

try:
    # Verificar la existencia del archivo de entrada
    archivo_excel= r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\BASE_DIRECCIONES.xlsx'
    archivo_excel_2= r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\Nomenclatura_Direciones.xlsx'
    
    # Leer los archivos Excel
    df=pd.read_excel(archivo_excel, sheet_name='PDV')
    df_2=pd.read_excel(archivo_excel_2, sheet_name='Nomenclatura')

    # Verificar columnas
    if 'DIRECCION' not in df.columns:
        raise KeyError('La columna "DIRECCION" no está presente en el DataFrame.')

    ##################################### Formatear Direcciones #####################################
    direccion_pdv = np.array(df['DIRECCION'].tolist())

    # Formatear las direcciones y aplicar tqdm para mostrar progreso
    direccion_pdv = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in tqdm(direccion_pdv, 'Formateando Direcciones!')]

    direccion = np.array(df_2['DIRECCION'].tolist())
    nomenclatura = np.array(df_2['NOMENCLATURA'].tolist())

    # Ajustar nomenclaturas
    for index in tqdm(range(len(direccion_pdv)), desc='Ajustando Nomenclatura de las Direcciones!'):
        for i in range(len(direccion)):
            direccion_pdv[index] = direccion_pdv[index].replace(direccion[i], nomenclatura[i])

    # Crear columna para direcciones arregladas
    df['DIRECCION_ARREGLADA'] = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in tqdm(direccion_pdv, 'Realizando Últimos Ajustes!')]

    ##################################### Coordenadas de Direcciones #####################################

    # Función para obtener coordenadas de la API de Google
    def obtener_coordenadas(api_key, direccion):
        base_url = "https://maps.googleapis.com/maps/api/geocode/json"
        parametros = {"address": direccion, "key": api_key}

        try:
            respuesta = requests.get(base_url, params=parametros)
            respuesta.raise_for_status()  # Levantar excepción si la solicitud fue fallida
            datos = respuesta.json()

            if datos["status"] == "OK" and datos.get("results"):
                # Obtén las coordenadas de la primera coincidencia
                coordenadas = datos["results"][0]["geometry"]["location"]
                latitud = coordenadas["lat"]
                longitud = coordenadas["lng"]
                return latitud, longitud
            else:
                error_message = datos.get("error_message", "Error desconocido")
                print(f"Error al obtener las coordenadas: {datos['status']} - {error_message}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"Error en la solicitud a la API: {e}")
            return None
        except (KeyError, ValueError) as e:
            print(f"Error al procesar los datos de la API: {e}")
            return None

    clave_api = 'AIzaSyCMd-AKCN4aqTA6BcXkIAro1YgcFh8CjPw'
    direccion_a_buscar = df['DIRECCION_ARREGLADA'] + ',' + df['CIUDAD'] + ',' + df['PAIS']
    direccion_arrey = np.array(direccion_a_buscar.tolist())

    # Obtener coordenadas y mostrar progreso con tqdm
    coordenadas_list = []
    for direccion in tqdm(direccion_a_buscar, desc='Obteniendo Coordenadas'):
        coordenadas = obtener_coordenadas(clave_api, direccion)
        if coordenadas:
            coordenadas_list.append(coordenadas)
        else:
            coordenadas_list.append((None, None))  # Añadir tupla vacía en caso de error

    # Dividir las coordenadas en dos columnas separadas
    df[['LATITUD_PDV', 'LONGITUD_PDV']] = pd.DataFrame(coordenadas_list, index=df.index)

except FileNotFoundError as e:
    print(f"Error: {e}")

except KeyError as e:
    print(f"Error de clave: {e}")    

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}:{e}")

else:
    # Exportar la base de datos generada en Excel
    salida_excel = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python\Direcciones_Ajustadas.xlsx'
    df.to_excel(salida_excel, sheet_name='Direcciones_PDV')
    print('Base de Datos Terminada')

finally:
    print('Proceso finalizado.')
