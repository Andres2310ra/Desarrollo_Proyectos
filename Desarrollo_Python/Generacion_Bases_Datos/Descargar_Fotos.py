import os
import requests
import pandas as pd
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor

# Ruta del archivo Excel
excel_path = r"C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\Fotos_URLs.xlsx"

# Leer URLs del archivo Excel
df = pd.read_excel(excel_path)
urls = df['FOTOS URL'].tolist()

# Ruta de la carpeta donde se guardarán las fotos
save_folder = r"C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Desktop\FOTOS_DESCARGA"

# Crear la carpeta si no existe
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

# Función para descargar y guardar cada imagen
def download_image(url):
    try:
        file_name = url.split("/")[-1]
        save_path = os.path.join(save_folder, file_name)

        response = requests.get(url)
        if response.status_code == 200:
            with open(save_path, 'wb') as file:
                file.write(response.content)
        else:
            print(f"Error al descargar la imagen: {url}")
    except Exception as e:
        print(f"Error durante la descarga: {url}. Detalles: {e}")

# Usar ThreadPoolExecutor para descargar en paralelo
with ThreadPoolExecutor(max_workers=10) as executor:  # Puedes ajustar el número de hilos (max_workers)
    list(tqdm(executor.map(download_image, urls), total=len(urls), desc="Descarga de Fotos"))
