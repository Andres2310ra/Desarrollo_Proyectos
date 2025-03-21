'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let funcion = document.getElementById('funcion');
    let btn_cal = document.getElementById('btn-cal');
    let parametros = document.getElementById('parametros');
    let btn_parametros = document.getElementById('btn-parametros');
    let numero = 0;
    let valor_anterior = 0;

    function suma(valor) {
        const resultado = 'El valor retornado es: ' + Number(valor);

        return resultado;
    }

    btn_cal.addEventListener('click', function () {

        let total = 0;

        numero = Math.floor(Math.random() * 10) + 1;
        total = numero + valor_anterior;

        console.log('total: ' + numero + ' + ' + valor_anterior + ' = ' + total);

        if (total >= 100) {

            funcion.innerHTML = 'Proceso Terminado, la suma de todos los numeros es mayor igual a 100: ' + total;
            valor_anterior = 0;
            total = 0;
            numero = 0;
        } else {
            funcion.innerHTML = suma(total);
        }
        valor_anterior = total;
    });

    function calculadora(operacion) {
            const resultado = eval(operacion);
            return resultado;
    }

    btn_parametros.addEventListener('click', function () {
        Swal.fire({
            title: "Parametros",
            input: "text",
            inputAttributes: {
                pattern: "[0-9+\\-*/()]*"
            },
            icon: "success",
            draggable: true,
            didOpen: () => {
                const input = Swal.getInput();
                input.addEventListener('input', () => {
                    input.value = input.value.replace(/[^0-9+\-*/()]/g, '');
                });
            },
            preConfirm: (value) => {
                if (!/^[0-9+\-*/()]*$/.test(value)) {
                    Swal.showValidationMessage('Por favor, ingresa solo números y los caracteres +, -, /, *, ().');
                    return false;
                } else {
                    parametros.innerHTML = calculadora(value);
                }
            }
        });
    });
});