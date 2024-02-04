import pandas as pd
import numpy as np
import faker as Faker

try:
    fk = Faker.Faker() 
    np.random.seed(50)
    numero_registros = 100
    nombre_pais_set=set()

    while len(nombre_pais_set) < numero_registros:
        nombre_pais_set.add(fk.country())

    nombre_pais = list(nombre_pais_set)
    venta_pais = np.random.randint(100,1000,numero_registros)

    data = {
        'PAIS VENTA': nombre_pais,
        'VENTAS': venta_pais
    }

    df = pd.DataFrame(data)

    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Modelo_Servicio\Base_Ventas.xlsx', sheet_name='VENTAS')

except Exception as e:
    print(f"Hubo un error con la base de datos: {type(e).__name__}:{e}")

else:
    print('Base de Datos Terminada')
