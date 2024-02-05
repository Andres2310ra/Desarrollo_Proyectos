import pandas as pd
import numpy as np

try:
    archivo_excel= r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Trabajo_Python\BASE_DIRECCIONES.xlsx'
    if not pd.ExcelFile(archivo_excel).sheet_names:
        raise FileNotFoundError(f"No se encontró el archivo Excel en la ruta especificada: {archivo_excel}")
    
    archivo_excel_2= r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Trabajo_Python\Nomenclatura_Direciones.xlsx'

    df=pd.read_excel(archivo_excel,sheet_name='PDV')
    df_2=pd.read_excel(archivo_excel_2,sheet_name='Nomenclatura')

    if 'DIRECCION' not in df.columns:
        raise KeyError('Hay columnas que no estan presente en el DataFreme.')

    direccion_pdv = np.array(df['DIRECCION'].tolist())

    # ############# Variables de Prueba #############
    # prueba=direccion_pdv

    # Formatear las direcciones
    direccion_pdv = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in direccion_pdv]

    # ############# Variables de Prueba #############
    # direccion_pdv_2 = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in direccion_pdv]

    direccion = np.array(df_2['DIRECCION'].tolist())
    nomenclatura = np.array(df_2['NOMENCLATURA'].tolist())

    for index in range(len(direccion_pdv)):
        for i in range(len(direccion)):
            direccion_pdv[index] = direccion_pdv[index].replace(direccion[i] , nomenclatura[i])

     # Crear Nueva Columna
    df['DIRECCION_ARREGLADA'] = np.nan # Se Crea Columna con NAN (Numero no Valido)

    df['DIRECCION_ARREGLADA'] = df['DIRECCION_ARREGLADA'].astype('object') # Se Transforma Columna a Objeto para que Pueda Recibir Cual Quier Tipo de Dato

    # Voler a Formatear las Direcciones para Quitar Espacios Sobrantes Despues del Ajuste de Nomenclatura
    direccion_pdv = [' '.join(palabra.upper() for palabra in direccion.strip().split()) for direccion in direccion_pdv]

    df['DIRECCION_ARREGLADA'] = direccion_pdv

except FileNotFoundError as e:
    print(f"Error: {e}")

except KeyError as e:
    print(f"Error: {e}")    

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}:{e}")

else:
    # print('Direccion Inicial:    ' + prueba[3])
    # print('Direccion Formateada: ' + direccion_pdv_2[3])
    # print('Direccion Ajustada:   ' + direccion_pdv[3])

    # Exportar Base de Datos Generada en Excel
    df.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Generadas_Python\Direcciones_Ajustadas.xlsx', sheet_name='Direcciones_PDV')

    print('Base de Datos Terminada')