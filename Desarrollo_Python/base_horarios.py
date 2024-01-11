import pandas as pd
import numpy as np
from faker import Faker
import datetime
 
# Configuración de Faker para generar nombres y direcciones
fake = Faker()
 
# Configuración de semilla para reproducibilidad
np.random.seed(50)
 
# Número de puntos de venta
numRegistros = 1000
 
# Generar datos aleatorios
usuarioCodigo = np.random.randint(1, 10001, numRegistros)

fIni = datetime.date(2023, 1, 1)
fFin = datetime.date(2023, 12, 31)
fechaHorario=[fake.date_between_dates(date_start=fIni, date_end=fFin) for _ in range(numRegistros)]

hEntrada=[0.291666666666667,0.3125,0.333333333333333]
hAleatoria=np.random.randint(0,3,numRegistros)
horaEntrada=[hEntrada[aleatorio] for aleatorio  in hAleatoria]

horaIngreso=np.random.uniform(0.290972222222222,0.417361111111111,numRegistros)
HoraSalida=np.random.uniform(0.708333333333333,0.791666666666667,numRegistros)
HoraSalida = [datetime.datetime.fromtimestamp(value * 86400, datetime.timezone.utc).strftime('%H:%M:%S.%f') for value in HoraSalida]

# Crear el DataFrame
data = {
    'USU_NOMBRE': usuarioCodigo,
    'NOMBRE_USUARUIO':'',
    'USUARIO':'',
    'FECHA_HORARIO':fechaHorario,
    'HORA_ENTRADA':horaEntrada,
    'HORA_INGRESO':horaIngreso,
    'HORA_SALIDA':HoraSalida,
    'ESTADO':1}

df = pd.DataFrame(data)
df['HORA_SALIDA'] = pd.to_datetime(df['HORA_SALIDA'], format='%H:%M:%S.%f', errors='coerce')
# print(df)

try:
    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Python\base_horarios.xlsx', sheet_name='HORARIOS', index=True)
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Base de Datos Terminada")
