function solution(num) {

    let resultado

    if ((num !== 2 && num !== 3) || (num % 2 === 0 || num % 3 === 0)) {
        resultado = true
    } else {
        resultado = false
    }
    console.log(resultado)
}

let valor = 2

solution(valor)
