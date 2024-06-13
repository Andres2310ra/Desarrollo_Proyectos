import os
import requests

# Lista de URLs
urls = [
"https://visionstandardapp.blob.core.windows.net/data/fotosWeb/138/23029737-904d44c8-58cd-4a2b-b4d2-00a82a5ee0c0.jpg",
"https://azpgblobladgtm1p.blob.core.windows.net/photo-storage-prod/a0G8a00002ddtL7EAIa088a00001axVjNAAUa0F8a00001JoNxQEAVa078a000015A1wTa0C8a000010jYSAEA2171785750121.jpg"
]

# Ruta de la carpeta donde se guardarán las fotos
save_folder = r"C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Desktop\FOTOS_DESCARGA"

# Crear la carpeta si no existe
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

# Función para descargar y guardar cada imagen
def download_image(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f"Imagen descargada: {save_path}")
    else:
        print(f"Error al descargar la imagen: {url}")

# Descargar cada imagen de la lista
for url in urls:
    # Obtener el nombre del archivo de la URL
    file_name = url.split("/")[-1]
    # Ruta completa para guardar la imagen
    save_path = os.path.join(save_folder, file_name)
    # Descargar la imagen
    download_image(url, save_path)
