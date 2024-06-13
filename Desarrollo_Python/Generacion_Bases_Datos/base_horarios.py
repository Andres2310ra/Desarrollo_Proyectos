import pandas as pd
import numpy as np
from faker import Faker
import datetime
 
# Configuración de Faker para generar nombres y direcciones
fake = Faker()
 
# Configuración de semilla para reproducibilidad
np.random.seed(50)
 
# Número de puntos de venta
numRegistros = 5000
 
# Generar datos aleatorios
usuarioCodigo = np.random.randint(1, 10001, numRegistros)

fIni = datetime.date(2024, 5, 1)
fFin = datetime.date(2024, 5, 31)
fechaHorario=[fake.date_between_dates(date_start=fIni, date_end=fFin) for _ in range(numRegistros)]

hEntrada=[0.291666666666667,0.3125,0.333333333333333]
hAleatoria=np.random.randint(0,3,numRegistros)
horaEntrada=[hEntrada[aleatorio] for aleatorio  in hAleatoria]
horaEntrada = [datetime.datetime.fromtimestamp(value * 86400, datetime.timezone.utc).strftime('%H:%M:%S') for value in horaEntrada]

horaIngreso=np.random.uniform(0.290972222222222,0.417361111111111,numRegistros)
horaIngreso = [datetime.datetime.fromtimestamp(value * 86400, datetime.timezone.utc).strftime('%H:%M:%S') for value in horaIngreso]

HoraSalida=np.random.uniform(0.708333333333333,0.791666666666667,numRegistros)
HoraSalida = [datetime.datetime.fromtimestamp(value * 86400, datetime.timezone.utc).strftime('%H:%M:%S') for value in HoraSalida]

# Crear el DataFrame
data = {
    'USU_CODIGO': usuarioCodigo,
    'NOMBRE_USUARUIO':'',
    'USUARIO':'',
    'FECHA_HORARIO':fechaHorario,
    'HORA_ENTRADA':horaEntrada,
    'HORA_INGRESO':horaIngreso,
    'HORA_SALIDA':HoraSalida,
    'ESTADO':1}

df = pd.DataFrame(data)

df['HORA_ENTRADA'] = pd.to_datetime(df['HORA_ENTRADA'], format='%H:%M:%S', errors='coerce')
df['HORA_ENTRADA'] = df['HORA_ENTRADA'].dt.strftime('%H:%M:%S')

df['HORA_INGRESO'] = pd.to_datetime(df['HORA_INGRESO'], format='%H:%M:%S', errors='coerce')
df['HORA_INGRESO'] = df['HORA_INGRESO'].dt.strftime('%H:%M:%S')

df['HORA_SALIDA'] = pd.to_datetime(df['HORA_SALIDA'], format='%H:%M:%S', errors='coerce')
df['HORA_SALIDA'] = df['HORA_SALIDA'].dt.strftime('%H:%M:%S')
# print(df)

try:
    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Python\base_horarios.xlsx', sheet_name='HORARIOS', index=True)
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Base de Datos Terminada")
