# from openpyxl import op
import pandas as pd

rutaDoc = r'C:\Users\carlo\OneDrive\Documents\GitHub\Platzi_Estudio\Desarrollo_Python\BD_Ventas_Frutas.xlsx'
datosExcel = pd.read_excel(rutaDoc,sheet_name='VENTAS')

print(datosExcel)
