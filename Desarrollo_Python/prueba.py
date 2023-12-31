# from openpyxl import op
import pandas as pd

rutaDoc = r'C:\Users\carlo\OneDrive\Documents\GitHub\Platzi_Estudio\Desarrollo_Python\BD_Ventas_Frutas.xlsx'
datosExcel = pd.read_excel(rutaDoc,sheet_name='VENTAS')

print(datosExcel)

# Agrupar por la columna 'Fruta' y calcular el promedio de la columna 'Total'
promedio_por_fruta = datosExcel.groupby('Fruta')['Total'].mean()

print(promedio_por_fruta)