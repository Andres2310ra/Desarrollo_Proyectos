import pandas as pd
import numpy as np
from faker import Faker
 
# Configuración de Faker para generar nombres y direcciones
fake = Faker()
 
# Configuración de semilla para reproducibilidad
np.random.seed(1)
 
# Número de puntos de venta
numRegistros = 10000
 
# Generar datos aleatorios
doc = np.random.randint(1011111111, 1099999999, numRegistros)
nombres = [fake.first_name() for _ in range(numRegistros)]
apellidos = [fake.last_name() for _ in range(numRegistros)]
f_nacimiento = [fake.date_of_birth(minimum_age=17, maximum_age=45) for _ in range(numRegistros)]
login = [n + "." + a for n, a in zip(nombres,apellidos)]
direccion = [fake.address() for _ in range(numRegistros)]
perfilCodigo = np.random.randint(1, 50, numRegistros)
ciudadCodigo = np.random.randint(1, 1341, numRegistros)
# latitudes = np.random.uniform(35.0, 45.0, numRegistros)
# longitudes = np.random.uniform(-5.0, 5.0, numRegistros)
 
# Crear el DataFrame
data = {
    'USU_NOMBRE': nombres,
    'USU_APELLIDO':apellidos,
    'USU_DOCUMENTO': doc,
    'TIP_DOC':'',
    'TIP_DOCUMENTO_NOMBRE':'',
    'USUARIO':login,
    'FECHA_NACIMIENTO':f_nacimiento,
    'PER_CODIGO':perfilCodigo,
    'PER_NOMBRE':'',
    'DIRECCION':direccion,
    'CIU_CODIGO':ciudadCodigo,
    'CIU_NOMBRE':'',
    'DEP_CODIGO':'',
    'DEP_NOMBRE':'',
    'PAI_CODIGO':'',
    'PAI_NOMBRE':'', 
    # 'Latitud': latitudes, 
    # 'Longitud': longitudes
    'ESTADO':1,
    'OBSERVACION':''}

df = pd.DataFrame(data)
# print(df)

try:
    df.to_excel(r'C:\Users\carlo\OneDrive\Escritorio\py\base_usuarios.xlsx', sheet_name='USUARIOS', index=True)
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Proceso Terminado")
