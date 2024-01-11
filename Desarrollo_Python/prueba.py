import pandas as pd
import faker as fk
import numpy as np

fk = fk.Faker()

numeroRegistros = 1001

nombres = [fk.name() for _ in range(numeroRegistros)]

data = {'Nombre': nombres}

df = pd.DataFrame(data)
print(df)
