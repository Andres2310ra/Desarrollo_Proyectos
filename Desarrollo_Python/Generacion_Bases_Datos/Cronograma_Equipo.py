import pandas as pd
from datetime import datetime

try:
    archivo_excel = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Plataformas\Diccionario_Equipo\Diccionario_Plataformas.xlsx'
    if not pd.ExcelFile(archivo_excel).sheet_names:
        raise FileNotFoundError(f"No se encontró el archivo Excel en la ruta especificada: {archivo_excel}")
    
    df = pd.read_excel(archivo_excel, sheet_name='Plataformas')
    df = df[df['CARGO'] != 'DESARROLLADOR BD']
    df = df[df['NOMBRE'] != 'VACANTE']

    d_comp = pd.read_excel(archivo_excel, sheet_name='Dias_Compensatorios')
    horarios = pd.read_excel(archivo_excel, sheet_name='Horarios')

    fechas = pd.date_range(start=datetime(2024, 3, 1), end=datetime(2024, 3, 31))
    df_fechas = pd.DataFrame(columns=fechas)

    # Iterar sobre las fechas y asignarlas como columnas en el DataFrame
    for fecha in fechas:
        df_fechas[fecha.strftime('%Y-%m-%d')]

    # Crear un DataFrame para el cronograma
    cronograma = {
        'NOMBRE':df['NOMBRE'],
        'CARGO':df['CARGO']
    }

    df2 = pd.DataFrame(cronograma)

    # Concatenar los DataFrames
    df_resultado = pd.concat([df2, df_fechas], axis=1)

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}: {e}")
else:
    df_resultado.to_excel(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Plataformas\Cronograma_Soporte\Cronograma_Soporte_Prueba.xlsx')
    print('Base de Datos Terminada')
