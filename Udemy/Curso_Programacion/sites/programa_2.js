'use strict';
document.addEventListener('DOMContentLoaded', function () {

    let numero_1 = document.getElementById('number_1');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    let boton_reinicio = document.getElementById('boton_volver');
    let suma = 0;
    let i = 0;
    let comparacion = 0;

    form_calculo.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });

    form_calculo.addEventListener('submit', function (event) {
        event.preventDefault();

        do {

            console.log("Valor del numero ingresado: " + Number(numero_1.value));
            console.log("Valor del numero de comparacion: " + comparacion);
            
            if (Number(numero_1.value) === comparacion) {
                numero_1.value = Math.floor(Math.random() * 1000);
            };

            if (Number(numero_1.value) > 0) {
                i++;
                suma = suma + Number(numero_1.value);

                Swal.fire({
                    title: "El valor sumado es: " + suma + " y la media es: " + (suma / i),
                    icon: "success",
                    draggable: true
                });
            }

            comparacion = Number(numero_1.value);
            console.log('Valor de comparacion: ' + comparacion);
            console.log('Valor numero despues de operacion: ' + Number(numero_1.value));
            console.log('Valor de iteracion: ' + i);
            console.log('Valor de la suma despues de operacion: ' + suma);

            break;

        } while (Number(numero_1.value) > 0);

    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    });

});