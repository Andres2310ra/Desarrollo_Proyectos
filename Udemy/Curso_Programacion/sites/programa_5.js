'use strict';
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

    form_calculo.addEventListener('submit', function (event) {
        event.preventDefault();

        let i = 0;
        let divisores = [];

        console.log("Valor del comparador: " + comparador);

        if (Number(valor_1.value) === 0) {
            valor_1.value = Math.floor(Math.random() * 100) + 1;
        } else if (Number(valor_1.value) === comparador) {
            valor_1.value = Math.floor(Math.random() * 100) + 1;
        }

        while (i <= Number(valor_1.value)) {
            if (Number(valor_1.value) % i === 0) {
                divisores.push(i);
            }
            i++;
        }

        console.log('Valor del numero ingresado: ' + valor_1.value);
        comparador = Number(valor_1.value)
        console.log(divisores);

        Swal.fire({
            title: "El numero de divisores de " + Number(valor_1.value) + " es: " + divisores.length,
            icon: "success",
            draggable: true
        }).then(() => {
            Swal.fire({
                title: "Los divisores de " + Number(valor_1.value) + " son:",
                text: divisores.join(', '),
                icon: "success",
                draggable: true
            });
        })

    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    });

});