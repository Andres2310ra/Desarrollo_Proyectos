import pyodbc

# Cadena de conexión usando autenticación de Windows
conn_str = """
DRIVER={ODBC Driver 17 for SQL Server};
SERVER=localhost;
DATABASE=INDIGITAL;
Trusted_Connection=yes;
"""

try:
    # Intentar conexión
    conn = pyodbc.connect(conn_str)
    print("Conexión exitosa con autenticación de Windows")

    # Ejemplo de consulta
    cursor = conn.cursor()
    cursor.execute("SELECT TOP 5 * FROM nombre_de_tu_tabla")  # Cambia el nombre de la tabla

    for row in cursor.fetchall():
        print(row)

    # Cierra conexión
    cursor.close()
    conn.close()

except Exception as e:
    print("Error al conectar:", e)
