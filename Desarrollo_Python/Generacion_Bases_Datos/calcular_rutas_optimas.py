import pandas as pd
from geopy.distance import great_circle
from sklearn.cluster import KMeans
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
 
# Cargar el dataframe
data = pd.ExcelFile(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Trabajo_Python\01. Mercaimpulso Centro1.xlsx')
 
######### Lee hoja del dataframe #####################
df = data.parse('BASE_ARREGLADA', header=None)
df.columns = df.iloc[0]
df=df.drop([0])
list(df)
df=df.rename(columns={'LATITUD':'Latitud' , 'LONGITUD':'Longitud'})
 
df_boyaca = df.loc[(df['Departamento']=='BOYACA')]  ## 5
df_casanare = df.loc[(df['Departamento']=='CASANARE')] ## 3
df_cundinamarca = df.loc[(df['Departamento']=='CUNDINAMARCA')] ## 15
df_guaviare = df.loc[(df['Departamento']=='GUAVIARE')] ## 1
df_meta = df.loc[(df['Departamento']=='META')] ## 4
df_bogota = df.loc[(df['Departamento']=='BOGOTA')] ## 58
 
 
adf= df_boyaca
# Especifica el número de clusters que deseas
num_clusters = 5
# Aplica el algoritmo de K-Means
kmeans = KMeans(n_clusters=num_clusters)
adf['Cluster'] = kmeans.fit_predict(adf[['Latitud', 'Longitud']])
adf['conteo'] = adf['Cluster'].map(adf['Cluster'].value_counts())
list(adf)
def calcular_centroide(dataframe):
    total_latitud = dataframe['Latitud'].mean()
    total_longitud = dataframe['Longitud'].mean()
    return total_latitud, total_longitud
def encontrar_punto_mas_cercano(origen, dataframe):
    distancia_minima = float('inf')
    punto_mas_cercano = None
    for index, row in dataframe.iterrows():
        punto = (row['Latitud'], row['Longitud'])
        distancia = great_circle(origen, punto).kilometers
        if distancia < distancia_minima:
            distancia_minima = distancia
            punto_mas_cercano = punto
            nombre_punto = row['Nombre Nestle']
    return punto_mas_cercano, distancia_minima, nombre_punto
def calcular_ruta_optima(dataframe):
    ruta_optima = []
    puntos_restantes = dataframe.copy()
    centroide = calcular_centroide(dataframe)
    orden = 1
    while not puntos_restantes.empty:
        punto_cercano, distancia, nombre_punto = encontrar_punto_mas_cercano(centroide, puntos_restantes)
        ruta_optima.append({'Orden': orden, 'Nombre Nestle': nombre_punto, 'Punto': punto_cercano, 'Distancia': distancia})
        puntos_restantes = puntos_restantes[~((puntos_restantes['Latitud'] == punto_cercano[0]) &
                                              (puntos_restantes['Longitud'] == punto_cercano[1]))]
        centroide = punto_cercano
        orden += 1
    return ruta_optima
# Calcular la ruta óptima para cada grupo
grupos = adf['Cluster'].unique()
adf_ruta_optima_total = pd.DataFrame()
for grupo in grupos:
    adf_grupo = adf[adf['Cluster'] == grupo].reset_index(drop=True)
    ruta_optima_grupo = calcular_ruta_optima(adf_grupo)
    adf_ruta_optima_grupo = pd.DataFrame(ruta_optima_grupo)
    adf_ruta_optima_grupo['Cluster'] = grupo
    adf_ruta_optima_total = pd.concat([adf_ruta_optima_total, adf_ruta_optima_grupo])
adf_ruta_optima_total['Distancia'] = adf_ruta_optima_total['Distancia'] * 1000
 
# Función para obtener los días del mes excluyendo los domingos
def obtener_dias_mes():
    hoy = datetime.now()
    primer_dia_mes = hoy.replace(day=1)
    ultimo_dia_mes = primer_dia_mes.replace(day=28) + timedelta(days=4)  # Asegurarse de cubrir hasta el día 31
 
    dias_mes = pd.date_range(primer_dia_mes, ultimo_dia_mes, freq='D')
    dias_mes_no_domingo = [d for d in dias_mes if d.weekday() not in (4, 5, 6)]  # Excluir mas dias
    dias_mes_no_domingo = [d for d in dias_mes if d.weekday() != 6] # Excluir domingos
    return dias_mes_no_domingo
list(adf)
 
# Función para redistribuir las X de manera que no excedan el tiempo límite en cada cluster y día
def redistribuir_x(adf):
    for cluster in adf['Cluster'].unique():
        cluster_adf = adf[adf['Cluster'] == cluster]
        for dia in dias_mes:
            tiempo_limite = 480
            cluster_dia_adf = cluster_adf[cluster_adf[dia.strftime('%Y-%m-%d')] == 'X']
            while cluster_dia_adf['Horas PDV2024'].sum() > tiempo_limite:
                punto_a_quitar = np.random.choice(cluster_dia_adf.index)
                adf.at[punto_a_quitar, dia.strftime('%Y-%m-%d')] = np.nan
                cluster_dia_adf = cluster_adf[cluster_adf[dia.strftime('%Y-%m-%d')] == 'X']
    return adf
 
# Obtener los días del mes
dias_mes = obtener_dias_mes()
# Agregar columnas para cada día del mes con información vacía
for dia in dias_mes:
    adf[dia.strftime('%Y-%m-%d')] = np.nan
# Agregar 'X' en las columnas de los días según la cantidad de Dias_de_visita de cada punto
for index, row in adf.iterrows():
    dias_a_visitar = row['Frecuencia 2024']
    dias_disponibles = adf.columns[34:]  # Ignorar las columnas
    dias_seleccionados = np.random.choice(dias_disponibles, dias_a_visitar, replace=False)
    adf.loc[index, dias_seleccionados] = 'X'
##### Funcion tiempos de movilización caminando
def tiempo_caminando(valor):
    if valor <= 500:
        return 5
    elif valor <= 1000:
        return 15
    elif valor <= 2000:
        return 30
    elif valor <= 3000:
        return 45
    elif valor <= 4000:
        return 60
    elif valor <= 5000:
        return 75
    elif valor <= 6000:
        return 90
    elif valor <= 7000:
        return 105
    elif valor <= 8000:
        return 120
    elif valor <= 9000:
        return 135
    elif valor <= 10000:
        return 150
    else:
        return 200
def tiempo_bicicleta(valor):
    if valor <= 500:
        return 3
    elif valor <= 1000:
        return 8
    elif valor <= 2000:
        return 12
    elif valor <= 3000:
        return 15
    elif valor <= 4000:
        return 18
    elif valor <= 5000:
        return 23
    elif valor <= 6000:
        return 28
    elif valor <= 7000:
        return 32
    elif valor <= 8000:
        return 36
    elif valor <= 9000:
        return 40
    elif valor <= 10000:
        return 44
    else:
        return 50
def tiempo_carro(valor):
    if valor <= 500:
        return 3
    elif valor <= 1000:
        return 12
    elif valor <= 2000:
        return 16
    elif valor <= 3000:
        return 19
    elif valor <= 4000:
        return 22
    elif valor <= 5000:
        return 24
    elif valor <= 6000:
        return 26
    elif valor <= 7000:
        return 28
    elif valor <= 8000:
        return 30
    elif valor <= 9000:
        return 32
    elif valor <= 10000:
        return 35
    else:
        return 40
adf_ruta_optima_total['Desplazamiento Caminando'] = adf_ruta_optima_total['Distancia'].apply(tiempo_caminando)
adf_ruta_optima_total['Desplazamiento Bicicleta'] = adf_ruta_optima_total['Distancia'].apply(tiempo_bicicleta)
adf_ruta_optima_total['Desplazamiento Carro'] = adf_ruta_optima_total['Distancia'].apply(tiempo_carro)
adf_final = pd.merge(adf_ruta_optima_total,adf,how='inner', on='Nombre Nestle')
#adf_final.drop_duplicates(subset =['NOMBRE V&M','Representante Farmacias_x','Coordinador',], keep = 'first', inplace = True)
 
# adf_final.to_excel(r'D:\Daniel alvarez\OneDrive - Vision & Marketing S.A.S\Desktop\MODELO DE SERVICIO_QUILLA3.xlsx', sheet_name='Base Rutas', index=False) #guardar en formato excel
 
#aadf_final.drop_duplicates(subset =['NOMBRE V&M','Representante Farmacias_x','Coordinador',], keep = 'first', inplace = True)
 
try:
    adf_final.to_excel(r'C:\Users\carlo\OneDrive\Documents\Desarrollo\Python\Bases_Generadas_Python\MODELO DE SERVICIO_centro.xlsx', sheet_name='Base Rutas', index=False)
 
except Exception as e:
    print(f"Ha ocurrido un error con la base de datos:{type(e).__name__}:{e}")
else:
    print("Base de Dato Terminada")