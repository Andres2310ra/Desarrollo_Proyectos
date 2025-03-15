'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let valor_1 = document.getElementById('number_1');
    let valor_2 = document.getElementById('number_2');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    let boton_reinicio = document.getElementById('boton_volver');
    let mensaje = '';
    let mensaje_2 = '';
    let i = 0;
    let comparador_1 = 0;
    let comparador_2 = 0;

    form_calculo.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });

    form_calculo.addEventListener('submit', function (event) {
        event.preventDefault();

        let impares = [];

        console.log(Number(valor_1.value));
        console.log(Number(valor_2.value));

        if (Number(valor_1.value) === 0 || Number(valor_2.value) === 0) {
            valor_1.value = Math.floor(Math.random() * 1000) + 1;
            valor_2.value = Math.floor(Math.random() * 1000) + 1;

        } else if (Number(valor_1.value) === comparador_1 && Number(valor_2.value) === comparador_2) {
            valor_1.value = Math.floor(Math.random() * 1000) + 1;
            valor_2.value = Math.floor(Math.random() * 1000) + 1;
        }

        if (Number(valor_1.value) <= Number(valor_2.value)) {
            for (i = Number(valor_1.value); i <= Number(valor_2.value); i++) {
                if (i % 2 !== 0) {
                    impares.push(i);
                }
            }
            mensaje = "Numeros impares entre " + Number(valor_1.value) + " y " + Number(valor_2.value) + " son: " + impares.join(', ');

            mensaje_2 = "De " + Number(valor_1.value) + " a " + Number(valor_2.value) + " hay " + impares.length + " numeros impares.";
        } else {
            for (i = Number(valor_2.value); i <= Number(valor_1.value); i++) {
                if (i % 2 !== 0) {
                    impares.push(i);
                }
            }
            mensaje = "Numeros impares entre " + Number(valor_2.value) + " y " + Number(valor_1.value) + " son: " + impares.join(', ');

            mensaje_2 = "De " + Number(valor_2.value) + " a " + Number(valor_1.value) + " hay " + impares.length + " numeros impares.";
        }

        comparador_1 = Number(valor_1.value);
        comparador_2 = Number(valor_2.value);

        console.log(impares);

        Swal.fire({
            title: mensaje_2,
            icon: "success",
            draggable: true
        }).then(() => {
            Swal.fire({
                title: mensaje,
                icon: "success",
                draggable: true
            });
        });

    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    });

});