import pyodbc
import pandas as pd

# Establecer la conexión a la base de datos
conn = pyodbc.connect('DRIVER={Driver};SERVER=10.0.0.7;DATABASE=Vum_Replica;UID=informacion;PWD=1nF0rm4c10n2022*')

# Definir la consulta SQL
sql_query = """
WITH CLI_ACT AS (
        -- Tu consulta SQL aquí
)

-- Resto de tu consulta SQL aquí
"""

# Ejecutar la consulta SQL y obtener los resultados
results = pd.read_sql(sql_query, conn)

# Cerrar la conexión a la base de datos
conn.close()

# Hacer cualquier procesamiento adicional según sea necesario
