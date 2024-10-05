import requests

def obtener_coordenadas(api_key, direccion):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    parametros = {"address": direccion, "key": api_key}
    
    try:
        respuesta = requests.get(base_url, params=parametros)
        datos = respuesta.json()

        # Verificar si la solicitud fue exitosa
        if datos["status"] == "OK" and datos.get("results"):
            # Obtén las coordenadas de la primera coincidencia
            coordenadas = datos["results"][0]["geometry"]["location"]
            latitud = coordenadas["lat"]
            longitud = coordenadas["lng"]
            return latitud, longitud
        else:
            # Retornar el estado de error proporcionado por la API si no es "OK"
            error_message = datos.get("error_message", "Error desconocido")
            return f"Error al obtener las coordenadas: {datos['status']} - {error_message}"
    
    except requests.exceptions.RequestException as e:
        # Capturar excepciones de la solicitud HTTP
        return f"Error en la solicitud: {e}"
    
    except (KeyError, ValueError) as e:
        # Capturar errores de parsing del JSON o acceso a datos no válidos
        return f"Error al procesar los datos: {e}"

# Ejemplo de uso
clave_api = 'AIzaSyCMd-AKCN4aqTA6BcXkIAro1YgcFh8CjPw'
direccion_a_buscar = "CR 80 # 70-97, Bogota, Colombia"

coordenadas = obtener_coordenadas(clave_api, direccion_a_buscar)

if isinstance(coordenadas, tuple):
    print(f"Las coordenadas de {direccion_a_buscar} son: {coordenadas}")
else:
    print(coordenadas)
