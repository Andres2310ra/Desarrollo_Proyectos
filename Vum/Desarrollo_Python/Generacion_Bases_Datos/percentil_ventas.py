import numpy as np
import pandas as pd

try:
    data = pd.ExcelFile(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Trabajo_Python/Modelo de servicio Diana1 1.xlsx')
    df = pd.read_excel(data, sheet_name='Modelo DIANA', header=1)

    promedioVentas = df['VENTA_PROMEDIO'].tolist()
    codigosPDV = df['CODIGO PDV'].tolist()

    percentil_25 = np.percentile(promedioVentas, 25)
    percentil_50 = np.percentile(promedioVentas, 50)
    percentil_75 = np.percentile(promedioVentas, 75)

    def asignarCategoriaPdv(ventas):
        if ventas <= percentil_25:
            return 'D'
        elif ventas <= percentil_50:
            return 'C'
        elif ventas <= percentil_75:
            return 'B'
        else:
            return 'A'

    categoriasPDV = {}

    for i, ventas in zip(codigosPDV, promedioVentas):
        categoriasPDV[i] = asignarCategoriaPdv(ventas)

    df['Categoria By Python'] = [categoriasPDV[codigo] for codigo in codigosPDV]

    df_resultado = pd.DataFrame({
        'CODIGO PDV': codigosPDV,
        'VENTA_PROMEDIO': promedioVentas,
        'Categoria By Python': df['Categoria By Python']
    })

    df_resultado.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Generadas_Python\CATEGORIA_PDV.xlsx', sheet_name='CATEGORIAS', index=False)


    # for i, categoria in categoriasPDV.items():
    #     print(f'PDV {i}: Categoría {categoria}')

    print("Resultados guardados en el archivo CATEGORIA_PDV.xlsx")

except Exception as e:
    print(f"Error: {e}")
