import pandas as pd
import numpy as np
from faker import Faker
 
# Configuración de Faker para generar nombres y direcciones
fake = Faker()
 
# Configuración de semilla para reproducibilidad
np.random.seed(42)
 
# Número de puntos de venta
num_puntos_venta = 1000
 
# Generar datos aleatorios
nombres = [fake.first_name() for _ in range(num_puntos_venta)]
apellidos = [fake.last_name() for _ in range(num_puntos_venta)]
f_nacimiento = [fake.date_of_birth(minimum_age=17, maximum_age=45) for _ in range(num_puntos_venta)]
login = [n + "." + a for n, a in zip(nombres,apellidos)]
direccion = [fake.address() for _ in range(num_puntos_venta)]
latitudes = np.random.uniform(35.0, 45.0, num_puntos_venta)  # Latitudes centradas en un país ficticio
longitudes = np.random.uniform(-5.0, 5.0, num_puntos_venta)  # Longitudes centradas en un país ficticio
ventas = np.random.uniform(5, 100, num_puntos_venta)
 
# Crear el DataFrame
data = {
    'Nombre': nombres,
    'Apellidos':apellidos,
    'Fecha_Nacimiento':f_nacimiento,
    'Usuario':login,
    'Direccion':direccion, 
    'Latitud': latitudes, 
    'Longitud': longitudes, 
    'Ventas': ventas}

df = pd.DataFrame(data)
# print(df)

try:
    df.to_excel(r'C:\Users\carlo\Descargas\base_usuarios.xlsx', sheet_name='USUARIOS', index=True)
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Proceso Terminado")
