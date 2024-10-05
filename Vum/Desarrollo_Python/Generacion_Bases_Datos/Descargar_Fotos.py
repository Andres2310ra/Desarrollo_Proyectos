# import os
# import requests
# import pandas as pd
# from tqdm import tqdm
# from concurrent.futures import ThreadPoolExecutor

# # Ruta del archivo Excel
# excel_path = r"C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\Fotos_URLs.xlsx"

# # Leer URLs del archivo Excel
# df = pd.read_excel(excel_path)
# urls = df['FOTOS URL'].tolist()

# # Ruta de la carpeta donde se guardarán las fotos
# save_folder = r"C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Desktop\FOTOS_DESCARGA"

# # Crear la carpeta si no existe
# if not os.path.exists(save_folder):
#     os.makedirs(save_folder)

# # Función para descargar y guardar cada imagen
# def download_image(url):
#     try:
#         file_name = url.split("/")[-1]
#         save_path = os.path.join(save_folder, file_name)

#         response = requests.get(url)
#         if response.status_code == 200:
#             with open(save_path, 'wb') as file:
#                 file.write(response.content)
#         else:
#             print(f"Error al descargar la imagen: {url}")
#     except Exception as e:
#         print(f"Error durante la descarga: {url}. Detalles: {e}")

# # Usar ThreadPoolExecutor para descargar en paralelo
# with ThreadPoolExecutor(max_workers=10) as executor:  # Puedes ajustar el número de hilos (max_workers)
#     list(tqdm(executor.map(download_image, urls), total=len(urls), desc="Descarga de Fotos"))

import os
import requests
import pandas as pd
from tqdm import tqdm
from sqlalchemy import create_engine

# Configuración de la conexión a SQL Server usando SQLAlchemy
conn_str = (
    "mssql+pyodbc://informacion:1nF0rm4c10n2022*@10.0.0.7/Vum_Replica"
    "?driver=SQL+Server"  # Indica el uso del driver de SQL Server
)

# Crear el motor de conexión usando SQLAlchemy
engine = create_engine(conn_str)

# Consulta SQL
query = """
BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT
FOT.FOT_CODIGO,
FOT.RUT_CODIGO,
FOT.TIP_CODIGO,
T1.TIP_NOMBRE,
FOT.FOT_NOMBRE,
FOT.FOT_RUTA,
COALESCE(FOA.EXH_CODIGO,FOA.ACO_CODIGO,FOA.AUD_CODIGO,FOA.ACI_CODIGO,FOA.GEE_CODIGO,FOA.SGE_CODIGO,FOA.FOR_CODIGO,FOA.REU_CODIGO,FOA.CAR_CODIGO,FOA.VEC_CODIGO) AS PRIMARY_KEY

FROM
SIM_FOTO AS FOT
INNER JOIN SIM_TIPO AS T1 ON T1.TIP_CODIGO=FOT.TIP_CODIGO
INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON FOA.FOT_CODIGO=FOT.FOT_CODIGO AND FOA.ESTADO=1
WHERE
FOT.ESTADO=1
AND CONVERT(DATE,FOT.FECHA_CREACION) BETWEEN  '2024-09-16' AND '2024-09-20'
--AND FOT.RUT_CODIGO=24548751 
ORDER BY FOT_CODIGO;

COMMIT TRANSACTION;
"""

# Ejecutar la consulta y cargar los resultados en un DataFrame de pandas
df = pd.read_sql(query, engine)

# Convertir la columna de rutas de imágenes (FOT.FOT_RUTA) a una lista
urls = df['FOT_RUTA'].tolist()

# Ruta de la carpeta donde se guardarán las fotos
save_folder = r"C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Desktop\FOTOS_DESCARGA"

# Crear la carpeta si no existe
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

# Función para descargar y guardar cada imagen
def download_image(url):
    try:
        file_name = url.split("/")[-1]
        save_path = os.path.join(save_folder, file_name)

        response = requests.get(url)
        if response.status_code == 200:
            with open(save_path, 'wb') as file:
                file.write(response.content)
        else:
            print(f"Error al descargar la imagen: {url}")
    except Exception as e:
        print(f"Error durante la descarga: {url}. Detalles: {e}")

# Usar ThreadPoolExecutor para descargar en paralelo
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=10) as executor:  # Puedes ajustar el número de hilos (max_workers)
    list(tqdm(executor.map(download_image, urls), total=len(urls), desc="Descarga de Fotos"))
