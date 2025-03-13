"use strict";
document.addEventListener('DOMContentLoaded', function () {

    let numero_1 = document.getElementById('number_1');
    let numero_2 = document.getElementById('number_2');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    
    form_calculo.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });

    form_calculo.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        let valor_1 = parseFloat(numero_1.value);
        let valor_2 = parseFloat(numero_2.value);

        if (valor_1 > valor_2) {
            Swal.fire({
                title: "El numero mayor es: " + valor_1 + " y el numero menor es: " + valor_2,
                icon: "success",
                draggable: true
            });
        } else if (valor_1 < valor_2) {
            Swal.fire({
                title: "El numero mayor es: " + valor_2 + " y el numero menor es: " + valor_1,
                icon: "success",
                draggable: true
            });
        } else if (valor_1 === valor_2) {
            Swal.fire({
                title: "Los numeros son iguales",
                icon: "error",
                draggable: true
            });
        } else {
            Swal.fire({
                title: "No puede haber campos vacios",
                icon: "error",
                draggable: true
            });
        }
    });
});