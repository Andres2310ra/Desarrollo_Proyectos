import pandas as pd
import numpy as np

try:
    archivo_excel= r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Trabajo_Python\PDV NESTLE.xlsx'
    if not pd.ExcelFile(archivo_excel).sheet_names:
        raise FileNotFoundError(f"No se encontró el archivo Excel en la ruta especificada: {archivo_excel}")
    
    archivo_excel_2= r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Trabajo_Python\Nomenclatura_Direciones.xlsx'

    df=pd.read_excel(archivo_excel,sheet_name='PDV')
    df_2=pd.read_excel(archivo_excel_2,sheet_name='Nomenclatura')

    if 'DIRECCION' not in df.columns:
        raise KeyError('Hay columnas que no estan presente en el DataFreme.')

    direccion_pdv = np.array(df['DIRECCION'].strip().split().tolist())
    direccion = np.array(df_2['DIRECCION'].tolist())
    nomenclatura = np.array(df_2['NOMENCLATURA'].tolist())

    for index in range(len(direccion_pdv)):
        for i in range(len(direccion)):
            direccion_pdv[index] = direccion_pdv[index].replace(direccion[i] , nomenclatura[i])

     # Crear Nueva Columna
    df['DIRECCION_ARREGLADA'] = np.nan # Se Crea Columna con NAN (Numero no Valido)

    df['DIRECCION_ARREGLADA'] = df['DIRECCION_ARREGLADA'].astype('object') # Se Transforma Columna a Objeto para que Pueda Recibir Cual Quier Tipo de Dato

    df['DIRECCION_ARREGLADA'] = direccion_pdv

except FileNotFoundError as e:
    print(f"Error: {e}")

except KeyError as e:
    print(f"Error: {e}")    

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}:{e}")

else:
    print('Base de Datos Terminada')
    # print(df.head(2))

    # Exportar Base de Datos Generada en Excel
    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Generadas_Python\Direcciones_Ajustadas.xlsx', sheet_name='Direcciones_PDV')