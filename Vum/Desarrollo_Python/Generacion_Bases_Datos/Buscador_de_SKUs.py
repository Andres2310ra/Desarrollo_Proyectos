import pandas as pd
from fuzzywuzzy import process
from fuzzywuzzy import fuzz

# Crear DataFrame para Lista_1
data_1 = {
    'MATERIAL': [
        12562311,12562304,12508551,12401438
    ],
    'NOMBRE_MATERIAL': [
        'BABY KLIM 1 LATA OCO 12X800G N1 CO',
        'BABY KLIM 2 LATA OCO 12X800G N1 CO',
        'BABY KLIM 2 LATA OCO 24X400G CO',
        'BESO DE AMOR 6(28X16G) CO'
    ]
}
lista_1 = pd.DataFrame(data_1)

# Crear DataFrame para Lista_2
data_2 = {
    'PRO_CODIGO': [
        70068,70066,70067
    ],
    'PRO_NOMBRE': [
        'ARTESAN X 150G ANTIOQUIA',
        'ARTESAN X 150G SANTUARIO',
        'ARTESAN X 150G VALLE'
    ]
}
lista_2 = pd.DataFrame(data_2)

# Umbral de similitud mínimo
UMBRAL_SIMILITUD = 50  # Puedes ajustar este valor según tus necesidades

# Función para buscar la coincidencia más cercana en la Lista_1 para cada elemento de la Lista_2
def buscar_coincidencia(nombre):
    matches = process.extractOne(nombre, lista_1['NOMBRE_MATERIAL'], scorer=fuzz.token_set_ratio)
    if matches[1] >= UMBRAL_SIMILITUD:
        return matches[0]
    else:
        return None

# Aplicar la función para encontrar las coincidencias en la Lista_1
lista_2['NOMBRE_MATERIAL'] = lista_2['PRO_NOMBRE'].apply(buscar_coincidencia)

# Filtrar los resultados que no encontraron coincidencia
lista_2 = lista_2.dropna()

# Fusionar los DataFrames
skus_encontrados = pd.merge(lista_1, lista_2, on='NOMBRE_MATERIAL')

# Escribir el DataFrame resultante en un archivo Excel
ruta_archivo_excel = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python\resultado_skus.xlsx'
skus_encontrados.to_excel(ruta_archivo_excel, index=False)

print("El archivo Excel se ha guardado exitosamente en:", ruta_archivo_excel)
