# Importar librerías
import requests
import random

# Definir las URLs de las fuentes web
url1 = "[1](https://www.bibliotecadenombres.com/apellidos/apellidos-espanoles/)"
url2 = "[2](https://www.saberespractico.com/curiosidades/apellidos-mas-comunes-en-espana/)"
url3 = "[3](https://www.lasexta.com/noticias/sociedad/estos-son-100-apellidos-nombres-espanoles-mas-comunes_2021051860a3ed3e1050f0000196fff8.html)"
url4 = "[4](https://culturacolectiva.com/estilo-de-vida/apellidos-de-origen-espanol/)"

# Obtener el contenido de las páginas web
response1 = requests.get(url1)
response2 = requests.get(url2)
response3 = requests.get(url3)
response4 = requests.get(url4)

# Extraer los apellidos de las páginas web
apellidos = []

# Usar expresiones regulares para encontrar los apellidos entre etiquetas HTML
import re
pattern = re.compile(r"<td>(\w+)</td>")

# Buscar los apellidos en la primera fuente web
matches = pattern.findall(response1.text)
for i in range(0, len(matches), 2):
    apellido = matches[i]
    # Añadir el apellido a la lista
    apellidos.append(apellido)

# Buscar los apellidos en la segunda fuente web
matches = pattern.findall(response2.text)
for i in range(0, len(matches), 2):
    apellido = matches[i]
    # Añadir el apellido a la lista
    apellidos.append(apellido)

# Buscar los apellidos en la tercera fuente web
matches = re.findall(r"\d+\. (\w+)", response3.text)
for apellido in matches:
    # Añadir el apellido a la lista
    apellidos.append(apellido)

# Buscar los apellidos en la cuarta fuente web
matches = re.findall(r"\w+", response4.text)
for apellido in matches:
    # Añadir el apellido a la lista
    apellidos.append(apellido)

# Eliminar los apellidos duplicados
apellidos = list(set(apellidos))

# Generar una lista aleatoria de 500 apellidos
lista_apellidos = []
for i in range(500):
    # Elegir un apellido al azar
    apellido = random.choice(apellidos)
    # Añadir el apellido a la lista
    lista_apellidos.append(apellido)

# Mostrar la lista de apellidos
print(lista_apellidos)
