"use strict";
document.addEventListener('DOMContentLoaded', function () {

    let numero_1 = document.getElementById('number_1');
    let numero_2 = document.getElementById('number_2');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    let boton_reinicio = document.getElementById('boton_volver');
    let comparador_1 = 0;
    let comparador_2 = 0;

    form_calculo.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });



    form_calculo.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        if (Number(numero_1.value) === comparador_1 && Number(numero_2.value) === comparador_2) {
            numero_1.value = Math.floor(Math.random() * 1000);
            numero_2.value = Math.floor(Math.random() * 1000);
        }
        if (isNaN(Number(numero_1.value)) && isNaN(Number(numero_2.value))) {
            numero_1.value = Math.floor(Math.random() * 1000);
            numero_2.value = Math.floor(Math.random() * 1000);
        }

        if (Number(numero_1.value) > Number(numero_2.value)) {
            Swal.fire({
                title: "El numero mayor es: " + Number(numero_1.value) + " y el numero menor es: " + Number(numero_2.value),
                icon: "success",
                draggable: true
            });
        } else if (Number(numero_1.value) < Number(numero_2.value)) {
            Swal.fire({
                title: "El numero mayor es: " + Number(numero_2.value) + " y el numero menor es: " + Number(numero_1.value),
                icon: "success",
                draggable: true
            });
        } else if (Number(numero_1.value) === Number(numero_2.value)) {
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

        comparador_1 = Number(numero_1.value);
        comparador_2 = Number(numero_2.value);
    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    });

});