import pandas as pd
import numpy as np
from tqdm import tqdm  # Importa la librería tqdm para la barra de progreso
import requests

try:
    archivo_excel= r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\BASE_DIRECCIONES.xlsx'
    if not pd.ExcelFile(archivo_excel).sheet_names:
        raise FileNotFoundError(f"No se encontró el archivo Excel en la ruta especificada: {archivo_excel}")
    
    archivo_excel_2= r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\Nomenclatura_Direciones.xlsx'

    df=pd.read_excel(archivo_excel,sheet_name='PDV')
    df_2=pd.read_excel(archivo_excel_2,sheet_name='Nomenclatura')

    if 'DIRECCION' not in df.columns:
        raise KeyError('Hay columnas que no estan presente en el DataFreme.')

    ##################################### Formatear Direcciones #####################################

    direccion_pdv = np.array(df['DIRECCION'].tolist())

    # ############# Variables de Prueba #############
    # prueba=direccion_pdv

    # Formatear las direcciones
    direccion_pdv = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in tqdm(direccion_pdv,'Formateando Direcciones!')]

    # ############# Variables de Prueba #############
    # direccion_pdv_2 = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in direccion_pdv]

    direccion = np.array(df_2['DIRECCION'].tolist())
    nomenclatura = np.array(df_2['NOMENCLATURA'].tolist())

    for index in tqdm(range(len(direccion_pdv)), desc='Ajsutando Nomenclatura de las Direcciones!'):
        for i in range(len(direccion)):
            direccion_pdv[index] = direccion_pdv[index].replace(direccion[i] , nomenclatura[i])

     # Crear Nueva Columna
    df['DIRECCION_ARREGLADA'] = np.nan # Se Crea Columna con NAN (Numero no Valido)

    df['DIRECCION_ARREGLADA'] = df['DIRECCION_ARREGLADA'].astype('object') # Se Transforma Columna a Objeto para que Pueda Recibir Cual Quier Tipo de Dato

    # Voler a Formatear las Direcciones para Quitar Espacios Sobrantes Despues del Ajuste de Nomenclatura
    direccion_pdv = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in tqdm(direccion_pdv,'Realizando Ultimos Ajustes!')]

    df['DIRECCION_ARREGLADA'] = direccion_pdv

    ##################################### Coordenadas de Direcciones #####################################

##### CODIGO FUNCIONAL #####

    def obtener_coordenadas(api_key, direccion):
        base_url = "https://maps.googleapis.com/maps/api/geocode/json"
        parametros = {"address": direccion, "key": api_key}

        respuesta = requests.get(base_url, params=parametros)
        datos = respuesta.json()

        if datos["status"] == "OK" and datos.get("results"):
            # Obtén las coordenadas de la primera coincidencia
            coordenadas = datos["results"][0]["geometry"]["location"]
            latitud = coordenadas["lat"]
            longitud = coordenadas["lng"]
            return latitud, longitud
        else:
            print("Error al obtener las coordenadas.")
            return None

    clave_api = 'AIzaSyAKbPDjckorVSxK30UTc10naoXgscO1jmU'
    direccion_a_buscar = df['DIRECCION_ARREGLADA'] + ',' + df['CIUDAD'] + ',' + df['PAIS']
    direccion_arrey=np.array(direccion_a_buscar.tolist())

    # Aplicar tqdm al ciclo for
    coordenadas_list = []
    for direccion in tqdm(direccion_a_buscar, desc='Obteniendo Coordenadas'):
        coordenadas = obtener_coordenadas(clave_api, direccion)
        if coordenadas:
            coordenadas_list.append(coordenadas)
        else:
            coordenadas_list.append((None, None))  # Añadir tupla vacía en caso de error

    # Dividir la columna 'COORDENADA_ENCONTRADA' en dos columnas separadas
    df[['LATITUD_PDV', 'LONGITUD_PDV']] = pd.DataFrame(coordenadas_list, index=df.index)



    # # # Eliminar la columna 'COORDENADA_ENCONTRADA' si no la necesitas
    # # df.drop(columns=['COORDENADA_ENCONTRADA'], inplace=True)

except FileNotFoundError as e:
    print(f"Error: {e}")

except KeyError as e:
    print(f"Error: {e}")    

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}:{e}")

else:
    # print('Direccion Inicial:    ' + prueba[3])
    # print('Direccion Formateada: ' + direccion_pdv_2[3])
    # print('Direccion Ajustada:   ' + direccion_pdv[3])

    # Exportar Base de Datos Generada en Excel
    df.to_excel(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python\Direcciones_Ajustadas.xlsx', sheet_name='Direcciones_PDV')

    print('Base de Datos Terminada')