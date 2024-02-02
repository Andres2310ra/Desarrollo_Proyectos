import pandas as pd
import numpy as np
import faker as Facker

try:
    fk=Facker()
    np.random.seed(1)
    numero_registros=100

    nombre_pdv=[fk.country() for _ in (range(numero_registros))]
    

except Exception as e:
    print(f"Hubo un error con la base de datos: {e}")