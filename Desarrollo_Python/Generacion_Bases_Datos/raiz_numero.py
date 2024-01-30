import numpy as np

def numero_primo(n):
    for i in range(2, int(np.sqrt(n))):
        if n % i == 0:
            return False
    return True

valor = 17

print(numero_primo(valor))