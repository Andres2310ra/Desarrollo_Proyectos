import pandas as pd
import numpy as np
from faker import Faker
import datetime
 
# Configuración de Faker para generar nombres y direcciones
fake = Faker()
 
# Configuración de semilla para reproducibilidad
np.random.seed(1)
 
# Número de puntos de venta
numRegistros = 150000
 
# Generar datos aleatorios
usuarioCodigo = np.random.randint(1, 10001, numRegistros)

fIni = datetime.date(2023, 1, 1)
fFin = datetime.date(2023, 12, 31)

fechaHorario=[fake.date_between_dates(date_start=fIni, date_end=fFin) for _ in range(numRegistros)]

# Crear el DataFrame
data = {
    'USU_NOMBRE': usuarioCodigo,
    'NOMBRE_USUARUIO':'',
    'USUARIO':'',
    'FECHA_HORARIO':fechaHorario,
    'ESTADO':1}

df = pd.DataFrame(data)
# print(df)

try:
    df.to_excel(r'C:\Users\carlo\OneDrive\Escritorio\py\base_horarios.xlsx', sheet_name='HORARIOS', index=True)
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Base de Datos Terminada")
