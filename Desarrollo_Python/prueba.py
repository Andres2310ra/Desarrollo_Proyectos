import pandas as pd
import faker as fk
import numpy as np

fk = fk.Faker()

numeroRegistros = 1001

nombres = [fk.name() for _ in range(numeroRegistros)]

hEntrada=[0.291666666666667,0.3125,0.333333333333333]
hAleatoria=np.random.randint(1,3)
horaEntrada=hEntrada[hAleatoria]

data = {'Nombre': nombres}

df = pd.DataFrame(data)
print(df)
