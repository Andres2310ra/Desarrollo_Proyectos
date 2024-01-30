def for_(num):

    valor=[]

    for i in range(num):
        valor.append(num)

    return valor

valor=10

print(for_(valor))

# Ejemplo con un diccionario
persona = {"nombre": "Juan", "edad": 30, "ciudad": "México"}
for clave, valor in persona.items():
    print(clave, ":", valor)
