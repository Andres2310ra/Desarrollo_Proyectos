function solution(num) {
    let resultado = 0
    if (num % 2 === 0) {
        resultado = num / 2
    } else {
        resultado = num + 1
    }
    console.log(resultado)
}

let numero = 15
solution(numero)

