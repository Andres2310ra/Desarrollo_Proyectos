import pyodbc

# Configuración de la conexión
server = 'TU_SERVIDOR'  # Cambia esto por el nombre o dirección IP de tu servidor
database = 'TU_BASE_DE_DATOS'  # Cambia esto por el nombre de tu base de datos
username = 'TU_USUARIO'  # Cambia esto por tu usuario
password = 'TU_CONTRASEÑA'  # Cambia esto por tu contraseña

try:
    # Cadena de conexión
    conexion = pyodbc.connect(
        f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'
    )
    print("Conexión exitosa a SQL Server")

    # Crear un cursor para ejecutar consultas
    cursor = conexion.cursor()

    # Ejemplo: Ejecutar una consulta
    cursor.execute("SELECT TOP 10 * FROM TU_TABLA")  # Cambia TU_TABLA por el nombre de tu tabla
    filas = cursor.fetchall()

    # Imprimir los resultados
    for fila in filas:
        print(fila)

    # Cerrar el cursor y la conexión
    cursor.close()
    conexion.close()
    print("Conexión cerrada")

except pyodbc.Error as e:
    print("Error al conectar a SQL Server:", e)