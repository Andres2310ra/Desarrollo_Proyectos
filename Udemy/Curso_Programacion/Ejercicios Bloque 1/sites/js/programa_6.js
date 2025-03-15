'use strict'
document.addEventListener('DOMContentLoaded', function () {
    let valor_1 = document.getElementById('number_1');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    let boton_reinicio = document.getElementById('boton_volver');
    let comparador = 0;

    form_calculo.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });

    form_calculo.addEventListener('submit', function (e) {
        e.preventDefault();
        let i = 0;
        console.log(comparador);

        if (Number(valor_1.value) == comparador) {
            valor_1.value = Math.floor(Math.random() * 100) + 1;
        } else if (Number(valor_1.value) == 0) {
            valor_1.value = Math.floor(Math.random() * 100) + 1;
        }

        if (Number(valor_1.value) % 2 == 0) {
            Swal.fire({
                title: 'El numero ' + valor_1.value + ' es par',
                icon: "success",
                draggable: true
            });
        } else {
            Swal.fire({
                title: 'El numero ' + valor_1.value + ' es impar',
                icon: "success",
                draggable: true
            });
        }
        comparador = Number(valor_1.value);
    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    })

});