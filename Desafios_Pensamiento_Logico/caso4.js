function solution(num) {
  let resultado = [];

  function numPrimo(n) {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  for (let i = 2; i <= num; i++) {
    if (numPrimo(i)) {
      resultado.push(i);
    }
  }
  console.log(resultado);
}

let valor = 20000;

solution(valor);
