import spacy
import pandas as pd

# Cargar el modelo de Spacy
nlp = spacy.load('es_core_news_sm')

def reordenar_nombre(nombre_completo):
    palabras = nombre_completo.split()
    doc = nlp(nombre_completo)
    if len(palabras) == 4:  # Dos apellidos, dos nombres
        nombre_reordenado = palabras[2:] + palabras[:2]
    elif len(palabras) == 3:  # Un apellido, dos nombres (o viceversa)
        nombre_reordenado = palabras[1:] + palabras[:1]
    else:
        nombre_reordenado = palabras
    nombre_final = " ".join(nombre_reordenado)
    return nombre_final

# Ejemplos de uso
nombres_originales = ["CUERVO LAURA GABRIELA", "RAMOS GAITAN CARLOS ANDRES"]
nombres_reordenados = [reordenar_nombre(nombre) for nombre in nombres_originales]

# Crear un DataFrame con los resultados
df = pd.DataFrame({
    'Nombre Original': nombres_originales,
    'Nombre Reordenado': nombres_reordenados
})

# Exportar a Excel
nombre_archivo = "nombres_reordenados.xlsx"
df.to_excel(nombre_archivo, index=False)

print(f"Los nombres han sido exportados exitosamente a {nombre_archivo}")
