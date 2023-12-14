function solution(num) {

    let resultado=[]
    let i = 1

    while (i < num) {
        i++
        if ((i === 2 || i === 3) || (i % 2 !== 0 && i % 3 !== 0 && i % 5 !== 0 && i % 7 !== 0) ) {
            resultado.push(i)
        }
    }
    console.log(resultado)
}

let valor = 100

solution(valor)
