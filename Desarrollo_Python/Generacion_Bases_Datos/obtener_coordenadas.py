import requests

def obtener_coordenadas(api_key, direccion):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    parametros = {"address": direccion, "key": api_key}

    respuesta = requests.get(base_url, params=parametros)
    datos = respuesta.json()

    if datos["status"] == "OK" and datos.get("results"):
        # Obtén las coordenadas de la primera coincidencia
        coordenadas = datos["results"][0]["geometry"]["location"]
        latitud = coordenadas["lat"]
        longitud = coordenadas["lng"]
        return latitud, longitud
    else:
        # print("Error al obtener las coordenadas.")
        return "Error al obtener las coordenadas." # None

clave_api = 'AIzaSyCMd-AKCN4aqTA6BcXkIAro1YgcFh8CjPw'
direccion_a_buscar = "CR 80 # 70-97, Bogota, Colombia"  # Ejemplo de dirección

coordenadas = obtener_coordenadas(clave_api, direccion_a_buscar)

if coordenadas:
    print(f"Las coordenadas de {direccion_a_buscar} son: {coordenadas}")
