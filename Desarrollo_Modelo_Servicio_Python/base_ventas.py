import pandas as pd
import numpy as np
import faker as Faker

try:
    fk = Faker.Faker() 
    np.random.seed(42)
    numero_registros = 10000
    nombre_cliente_set=set()

    while len(nombre_cliente_set) < numero_registros:
        nombre_cliente_set.add(fk.name())

    nombre_cliente = list(nombre_cliente_set)
    venta_cliente = np.random.randint(100,100000,numero_registros)

    data = {
        'CLIENTE VENTA': nombre_cliente,
        'VENTAS': venta_cliente
    }

    df = pd.DataFrame(data)

    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Modelo_Servicio\Base_Ventas.xlsx', sheet_name='VENTAS')

except Exception as e:
    print(f"Hubo un error con la base de datos: {type(e).__name__}:{e}")

else:
    print('Base de Datos Terminada')
