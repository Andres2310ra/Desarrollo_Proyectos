// CODIGO REALIZADO

function solution(numbers) {

    let multiplicador
    let promedio = 0
    let resultado

    for (let i = 0; i < numbers.length; i++) {

        multiplicador = numbers[i] / (i + 3)
        promedio += multiplicador
    }
    promedio /= numbers.length

    for (let i = 0; i < numbers.length; i++) {
        multiplicador = numbers[i] / (i + 3)

        if (multiplicador == promedio) {
            resultado = multiplicador
        } else {
            resultado = false
            break
        }
    }
    return resultado
}

//////////////////////////////////////////////////////

// CODIGO OPTIMIZADO

function solution(numbers) {
    let factor = numbers[0] / 3
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % factor != 0) {
            return false
        }
    }
    return factor
}


// console.log(solution([27, 36, 45, 54, 63, 72]))
solution([27, 36, 45, 54, 63, 72])

