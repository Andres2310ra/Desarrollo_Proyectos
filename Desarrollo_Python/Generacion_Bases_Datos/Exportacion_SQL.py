# import os
# import requests
# import pandas as pd
# from tqdm import tqdm
# from sqlalchemy import create_engine

# # Configuración de la conexión a SQL Server usando SQLAlchemy
# conn_str = (
#     "mssql+pyodbc://informacion:1nF0rm4c10n2022*@10.0.0.7/Vum_Replica"
#     "?driver=SQL+Server"  # Indica el uso del driver de SQL Server
# )

# # Crear el motor de conexión usando SQLAlchemy
# engine = create_engine(conn_str)

# # Consulta SQL
# query = """
# BEGIN TRANSACTION;
# SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
# SELECT
# USC.CLI_CODIGO,
# USU.USU_CODIGO,
# USC.USC_CODIGO,
# USA.USA_CODIGO,
# USU.USU_LOGIN AS USU_LOGIN
# FROM
# SIM_USUARIO AS USU
# INNER JOIN SIM_USUARIO_CLIENTE AS USC ON USC.USU_CODIGO=USU.USU_CODIGO
# INNER JOIN SIM_USUARIO_ACTIVIIDAD AS USA ON USA.USC_CODIGO=USC.USC_CODIGO
# COMMIT TRANSACTION;
# """

# # Definir el tamaño del chunk
# chunksize = 3000000  # Ajusta este número según el tamaño de tus datos

# # Ejecutar la consulta y procesar los resultados por chunks
# try:
#     with open(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python\Date_Usuarios.txt', 'w', encoding='utf-8') as f:
#         # Escribir el encabezado del archivo la primera vez
#         first_chunk = True
#         # Leer los datos en chunks y usar tqdm para ver el progreso
#         for chunk in tqdm(pd.read_sql(query, engine, chunksize=chunksize), desc="Procesando datos"):
#             # Escribir los chunks en el archivo en formato CSV
#             chunk.to_csv(f, sep=',', index=False, header=first_chunk, mode='a')
#             first_chunk = False  # Solo se escribe el encabezado la primera vez
# except Exception as e:
#     print(f"Ha ocurrido un error con la base de datos: {type(e).__name__}: {e}")
# else:
#     print("Base de Datos Terminada")

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
TIP.TIP_CODIGO,
TIP.TIP_NOMBRE,
CLT.CLT_NOMBRE
FROM
SIM_TIPO AS TIP
INNER JOIN SIM_CLASE_TIPO AS CLT ON CLT.CLT_CODIGO=TIP.CLT_CODIGO
COMMIT TRANSACTION;
"""

# Ejecutar la consulta y cargar los resultados en un DataFrame de pandas
df = pd.read_sql(query, engine)

try:
    df.to_csv(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python\Datas\Date_Tipos.txt', sep=',', index=False)
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Base de Datos Terminada")
