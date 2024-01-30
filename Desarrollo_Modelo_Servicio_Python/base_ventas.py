import pandas as pd
import numpy as np
import faker as Facker

try:
    fk=Facker()
    np.random.seed(1)

except Exception as e:
    print(f"Hubo un error con la base de datos: {e}")