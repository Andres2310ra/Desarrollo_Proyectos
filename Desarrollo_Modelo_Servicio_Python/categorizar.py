import pandas as pd
import numpy as np

try:
    # Validar Existencia del Archivo
    archivo_excel = r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Modelo_Servicio\Base_Ventas.xlsx'
    if not pd.ExcelFile(archivo_excel).sheet_names:
        raise FileNotFoundError(f"No se encontró el archivo Excel en la ruta especificada: {archivo_excel}")

    # Lectura del Archivo Excel
    df = pd.read_excel(archivo_excel, sheet_name='VENTAS')

    # Validar Columnas
    if 'VENTAS' not in df.columns:
        raise KeyError("La columna 'VENTAS' no está presente en el DataFrame.")

    # Calcula el rango intercuartil (IQR) y los límites para categorizar
    Q1 = df['VENTAS'].quantile(0.25)
    Q2 = df['VENTAS'].quantile(0.50)
    Q3 = df['VENTAS'].quantile(0.75)

    IQR = Q3 - Q1
    lower_limit = Q1 - 1.5 * IQR
    upper_limit = Q3 + 1.5 * IQR

    # Crear Nueva Columna
    df['CATEGORIA'] = np.nan # Se Crea Columna con NAN para

    df['CATEGORIA'] = df['CATEGORIA'].astype('object')

    # Asignar las Categorías SegUn los Limites Calculados
    df.loc[(df['VENTAS'] < Q1) & (df['VENTAS'] >=lower_limit), 'CATEGORIA'] = 'D'
    df.loc[(df['VENTAS'] >= Q1) & (df['VENTAS'] < Q2), 'CATEGORIA'] = 'C'
    df.loc[(df['VENTAS'] >= Q2) & (df['VENTAS'] < Q3), 'CATEGORIA'] = 'B'
    df.loc[(df['VENTAS'] >= Q3) & (df['VENTAS'] <= upper_limit), 'CATEGORIA'] = 'A'
    df.loc[df['VENTAS'] > upper_limit, 'CATEGORIA'] = 'A+'
    df.loc[df['VENTAS'] < lower_limit, 'CATEGORIA'] = 'D-'

except FileNotFoundError as e:
    print(f"Error: {e}")

except KeyError as e:
    print(f"Error: {e}")

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}:{e}")

else:
    print('Base de Datos Terminada')
    #print(df.head(5))  # Mostrar las Primeras Filas del DataFrime

    # Exportar Base de Datos Generada en Excel
    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Modelo_Servicio\Base_Ventas_Categorizadas.xlsx', sheet_name='VENTAS_CATEGORIZADAS')

    print(Q1)
    print(Q2)
    print(Q3)
    print(IQR)
    print(lower_limit)
    print(upper_limit)
