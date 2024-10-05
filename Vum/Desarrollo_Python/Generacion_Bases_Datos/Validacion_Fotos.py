import os
import requests
import pandas as pd
from tqdm import tqdm
from sqlalchemy import create_engine
from PIL import Image
from openpyxl import Workbook
import numpy as np
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

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
    CLI.CLI_CODIGO,
    CLI.CLI_NOMBRE,
    ACT.ACT_CODIGO,
    ACT.ACT_NOMBRE,
    FOT.FOT_CODIGO,
    FOT.RUT_CODIGO,
    FOT.TIP_CODIGO,
    T1.TIP_NOMBRE,
    FOT.FOT_NOMBRE,
    FOT.FOT_RUTA,
    FOA.ENA_CODIGO,
    UP.CODIGO_KEY,
    UP.PRIMARY_KEY
FROM
    SIM_FOTO AS FOT
INNER JOIN SIM_TIPO AS T1 ON T1.TIP_CODIGO = FOT.TIP_CODIGO
INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON FOA.FOT_CODIGO = FOT.FOT_CODIGO AND FOA.ESTADO = 1
INNER JOIN SIM_RUTA AS RUT ON RUT.RUT_CODIGO = FOT.RUT_CODIGO
INNER JOIN SIM_USUARIO_ACTIVIIDAD AS USA ON USA.USA_CODIGO = RUT.USA_CODIGO
INNER JOIN SIM_ACTIVIDAD AS ACT ON ACT.ACT_CODIGO = USA.ACT_CODIGO
INNER JOIN SIM_CLIENTE AS CLI ON CLI.CLI_CODIGO = ACT.CLI_CODIGO
CROSS APPLY
    (
        SELECT CODIGO_KEY, PRIMARY_KEY
        FROM (SELECT FOA.EXH_CODIGO, FOA.ACO_CODIGO, FOA.AUD_CODIGO, FOA.ACI_CODIGO, FOA.GEE_CODIGO, FOA.SGE_CODIGO, FOA.FOR_CODIGO, FOA.REU_CODIGO, FOA.CAR_CODIGO, FOA.VEC_CODIGO) AS p
        UNPIVOT
        (
            CODIGO_KEY FOR PRIMARY_KEY IN (EXH_CODIGO, ACO_CODIGO, AUD_CODIGO, ACI_CODIGO, GEE_CODIGO, SGE_CODIGO, FOR_CODIGO, REU_CODIGO, CAR_CODIGO, VEC_CODIGO)
        ) AS UP
    ) AS UP
WHERE
    (FOT.ESTADO = 1 AND CLI.ESTADO = 1 AND ACT.ESTADO = 1)
    AND CLI.CLI_CODIGO > 0 AND ACT.ACT_CODIGO > 0
    AND CONVERT(DATE, FOT.FECHA_CREACION) BETWEEN '2024-10-02' AND '2024-10-02'
ORDER BY FOT.FOT_CODIGO;

COMMIT TRANSACTION;
"""

# Ejecutar la consulta y cargar los resultados en un DataFrame de pandas
df = pd.read_sql(query, engine)

# Crear un archivo Excel
archivo_excel = Workbook()
hoja_excel = archivo_excel.active
hoja_excel.title = "Resultados"

# Encabezados del archivo Excel
hoja_excel.append([
    "CLI_CODIGO", "CLI_NOMBRE", "ACT_CODIGO", "ACT_NOMBRE", "FOT_CODIGO", "RUT_CODIGO", "TIP_CODIGO", 
    "TIP_NOMBRE", "FOT_NOMBRE", "FOT_RUTA", "ENA_CODIGO", "CODIGO_KEY", "PRIMARY_KEY",  # Columnas SQL
    "Es Blanca", "Dimensiones Correctas", "Es Negra", "Predominante en un Color", "Predominante Rojo o Rosado"  # Análisis de imagen
])

# Dimensiones específicas
dimensiones_esperadas = (307, 408)

# Umbrales
umbral_oscura = 50  # Para considerar la imagen como oscura
umbral_clara = 180  # Para considerar la imagen como clara
umbral_un_color = 0.8  # Umbral para un solo color
umbral_rojo_rosado = 0.3  # Umbral para rojo o rosado

# Obtener la hora de inicio del script
# hora_inicio = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# print(f"Inicio del script: {hora_inicio}")

# Función para analizar cada imagen
def analizar_imagen(index, row):
    url = row['FOT_RUTA']
    nombre_archivo = os.path.basename(url)  # Obtener el nombre del archivo desde la URL

    # Inicializar variables para análisis de imagen
    es_blanca = "No"
    dimensiones_correctas = "No"
    es_negra = "No"
    predominante_un_color = "No"
    predominante_rojo_rosado = "No"

    try:
        # Intentar abrir la imagen directamente desde la URL
        response = requests.get(url, stream=True, timeout=10)
        imagen_explorar = Image.open(response.raw)

        # Reducir la resolución si es necesario para análisis más rápido
        imagen_explorar.thumbnail((500, 500))  # Redimensionar para procesar más rápido si es muy grande

        # Convertir a espacio de color LAB
        imagen_lab = imagen_explorar.convert("LAB")
        canal_l = imagen_lab.split()[0]  # Extraer el canal L (luminancia)
        luminancia_promedio = np.mean(np.array(canal_l))

        # Verificar si es predominantemente blanca
        if luminancia_promedio >= umbral_clara:
            es_blanca = "Sí"

        # Verificar si las dimensiones son correctas
        if imagen_explorar.size == dimensiones_esperadas:
            dimensiones_correctas = "Sí"

        # Verificar si es predominantemente negra
        if luminancia_promedio <= umbral_oscura:
            es_negra = "Sí"

        # Convertir a espacio de color HSV (para analizar el color)
        imagen_hsv = imagen_explorar.convert("HSV")
        saturacion_promedio = np.mean(np.array(imagen_hsv.split()[1]))

        # Verificar si es predominantemente de un solo color
        if saturacion_promedio <= umbral_un_color:
            predominante_un_color = "Sí"

        # Verificar si es predominantemente roja o rosada
        np_image = np.array(imagen_explorar)
        red_pixels = np.sum((np_image[:, :, 0] > 150) & (np_image[:, :, 1] < 100) & (np_image[:, :, 2] < 100))
        total_pixels = np_image.shape[0] * np_image.shape[1]
        if (red_pixels / total_pixels) > umbral_rojo_rosado:
            predominante_rojo_rosado = "Sí"

    except Exception as e:
        print(f"Error al abrir la imagen {url}: {e}")

    # Retornar los resultados del análisis
    return [
        row['CLI_CODIGO'], row['CLI_NOMBRE'], row['ACT_CODIGO'], row['ACT_NOMBRE'], row['FOT_CODIGO'],
        row['RUT_CODIGO'], row['TIP_CODIGO'], row['TIP_NOMBRE'], row['FOT_NOMBRE'], row['FOT_RUTA'],
        row['ENA_CODIGO'], row['CODIGO_KEY'], row['PRIMARY_KEY'],  # Datos de la consulta SQL
        es_blanca, dimensiones_correctas, es_negra, predominante_un_color, predominante_rojo_rosado  # Análisis de imagen
    ]

# Usar ThreadPoolExecutor para analizar las imágenes en paralelo
with ThreadPoolExecutor(max_workers=10) as executor:  # Puedes ajustar max_workers según tu sistema
    resultados = list(tqdm(executor.map(lambda idx_row: analizar_imagen(*idx_row), df.iterrows()), total=len(df)))

# Agregar los resultados al archivo Excel
for resultado in resultados:
    hoja_excel.append(resultado)

# Guardar el archivo Excel con los resultados
archivo_excel.save(r"C:\Users\carlos.ramos\Downloads\resultados.xlsx")

# Obtener la hora de finalización del script
# hora_fin = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
# print(f"Fin del script: {hora_fin}")
