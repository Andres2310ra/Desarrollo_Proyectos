import numpy as np

def solution(num):
    resultado = []

    def numero_primo(n):
        for i in range(2, int(np.sqrt(n))):
            if n % i == 0:
                return False
        return True

    for i in range(2, num + 1):
        if numero_primo(i):
            resultado.append(i)

    return resultado

valor = 100000
print(solution(valor))
