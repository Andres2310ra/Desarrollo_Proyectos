'use strict'
document.addEventListener('DOMContentLoaded', function () {
    let resultado = document.getElementById('resultado');
    let operacion = document.getElementById('operacion');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    let boton_reinicio = document.getElementById('boton_volver');
    let suma = document.getElementById('n+');
    let resta = document.getElementById('n-');
    let multiplicacion = document.getElementById('nx');
    let division = document.getElementById('n/');
    let n0 = document.getElementById('n0');
    let n1 = document.getElementById('n1');
    let n2 = document.getElementById('n2');
    let n3 = document.getElementById('n3');
    let n4 = document.getElementById('n4');
    let n5 = document.getElementById('n5');
    let n6 = document.getElementById('n6');
    let n7 = document.getElementById('n7');
    let n8 = document.getElementById('n8');
    let n9 = document.getElementById('n9');
    let ce = document.getElementById('ce');

    form_calculo.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });

    suma.addEventListener('click', function () {
        operacion.value += '+';
    });
    resta.addEventListener('click', function () {
        operacion.value += '-';
    });
    multiplicacion.addEventListener('click', function () {
        operacion.value += '*';
    });
    division.addEventListener('click', function () {
        operacion.value += '/';
    });
    n0.addEventListener('click', function () {
        operacion.value += '0';
    });
    n1.addEventListener('click', function () {
        operacion.value += '1';
    });
    n2.addEventListener('click', function () {
        operacion.value += '2';
    });
    n3.addEventListener('click', function () {
        operacion.value += '3';
    });
    n4.addEventListener('click', function () {
        operacion.value += '4';
    });
    n5.addEventListener('click', function () {
        operacion.value += '5';
    });
    n6.addEventListener('click', function () {
        operacion.value += '6';
    });
    n7.addEventListener('click', function () {
        operacion.value += '7';
    });
    n8.addEventListener('click', function () {
        operacion.value += '8';
    });
    n9.addEventListener('click', function () {
        operacion.value += '9';
    });
    ce.addEventListener('click', function () {
        operacion.value = 0;
        resultado.innerHTML = '0';
    });

    operacion.addEventListener('input', function () {
        operacion.value = operacion.value.replace(/[^0-9+\-*/\.\s]/g, '');
    });

    form_calculo.addEventListener('submit', function (e) {
        e.preventDefault();

        // Expresión regular para validar operaciones aritméticas con decimales
        const regex = /^[0-9+\-*/\.\s]+$/;
        const invalidStartEnd = /^[+\-*/]|[+\-*/]$/;
        const consecutiveOperators = /[+\-*/]{2,}/;

        if (regex.test(operacion.value) && !invalidStartEnd.test(operacion.value) && !consecutiveOperators.test(operacion.value)) {
            try {
                console.log('Valor Operacion: ' + eval(operacion.value));
                console.log('Valor Resultado: ' + resultado.value);
                resultado.innerHTML = eval(operacion.value);
                operacion.value = eval(operacion.value);
            } catch (error) {
                alert('Error en la operación aritmética.');
            }
        } else {
            Swal.fire({
                title: "Novedad",
                text: "Tienes un error de sintaxis en la operación aritmética.",
                icon: "info",
                confirmButtonText: "Aceptar",
                draggable: true
            });
        }
    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    });
});