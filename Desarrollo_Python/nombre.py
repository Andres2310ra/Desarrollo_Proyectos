# Importar librerías
import requests
import random
import re

# Definir las URLs de las fuentes web
url1 = "https://www.planetamama.com.ar/nombres-de-bebes/buscar/todos/sexo/todos/origen/todos"
url2 = "https://www.aboutespanol.com/los-200-nombres-de-bebe-en-espanol-mas-populares-1176840"

# Obtener el contenido de las páginas web
response1 = requests.get(url1)
response2 = requests.get(url2)

# Extraer los nombres de las páginas web
nombres_mujer = []
nombres_hombre = []

# Usar expresiones regulares para encontrar los nombres entre etiquetas HTML
pattern = re.compile(r"<td>(\w+)</td>")

# Buscar los nombres en la primera fuente web
matches = pattern.findall(response1.text)
for i in range(0, len(matches), 2):
    nombre = matches[i]
    sexo = matches[i + 1]
    if sexo == "Mujer":
        nombres_mujer.append(nombre)
    elif sexo == "Varón":
        nombres_hombre.append(nombre)

# Buscar los nombres en la segunda fuente web
matches = pattern.findall(response2.text)
for i in range(0, len(matches), 2):
    nombre = matches[i]
    sexo = matches[i + 1]
    if sexo == "niña":
        nombres_mujer.append(nombre)
    elif sexo == "niño":
        nombres_hombre.append(nombre)

# Eliminar los nombres duplicados
nombres_mujer = list(set(nombres_mujer))
nombres_hombre = list(set(nombres_hombre))

# Verificar las listas de nombres obtenidas
print("Nombres de mujer:", nombres_mujer)
print("Nombres de hombre:", nombres_hombre)

# Obtener 500 nombres aleatorios de mujer
if len(nombres_mujer) >= 500:
    nombres_mujer_aleatorios = random.sample(nombres_mujer, 500)
else:
    nombres_mujer_aleatorios = nombres_mujer

# Obtener 500 nombres aleatorios de hombre
if len(nombres_hombre) >= 500:
    nombres_hombre_aleatorios = random.sample(nombres_hombre, 500)
else:
    nombres_hombre_aleatorios = nombres_hombre

# Combinar las dos listas de nombres
lista_nombres = nombres_mujer_aleatorios + nombres_hombre_aleatorios

# Mostrar la lista de nombres
print(lista_nombres)
