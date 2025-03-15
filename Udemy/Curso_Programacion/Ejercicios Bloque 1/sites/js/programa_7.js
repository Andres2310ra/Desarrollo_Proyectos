'use strict'
document.addEventListener('DOMContentLoaded', function () {
    let valor_1 = document.getElementById('number_1');
    let form_calculo = document.getElementById('form_calculo');
    let boton_inicio = document.getElementById('boton_inicio');
    let boton_reinicio = document.getElementById('boton_volver');
    let comparador = 0;
    let multiplicador = 10;
    let tabla_resultados = document.getElementById('tabla_resultados');
    let tabla_resultados_form = document.getElementById('tabla_resultados_form');

    form_calculo.style.display = 'none';
    tabla_resultados_form.style.display = 'none';

    boton_inicio.addEventListener('click', function () {
        form_calculo.style.display = 'block';
        boton_inicio.style.display = 'none';
    });

    form_calculo.addEventListener('submit', function (e) {
        e.preventDefault();

        tabla_resultados_form.style.display = 'block';

        let resultado = [];
        let iteracion = [];

        console.log(comparador);

        if (Number(valor_1.value) == 0) {
            valor_1.value = Math.floor(Math.random() * 1000) + 1;
        } else if (Number(valor_1.value) == comparador) {
            valor_1.value = Math.floor(Math.random() * 1000) + 1;
        }

        // Limpiar la tabla antes de agregar nuevas filas
        tabla_resultados.innerHTML = '';

        for (let i = 1; i <= multiplicador; i++) {
            iteracion.push(i);
            resultado.push(i * valor_1.value);

            // Crear una nueva fila
            let fila = document.createElement('tr');

            // Crear celdas para iteración y resultado
            let celda_iteracion = document.createElement('td');
            celda_iteracion.textContent = i + ' x ' + valor_1.value + ' = ';
            let celda_resultado = document.createElement('td');
            celda_resultado.textContent = i * valor_1.value;

            // Agregar celdas a la fila
            fila.appendChild(celda_iteracion);
            fila.appendChild(celda_resultado);

            // Agregar la fila a la tabla
            tabla_resultados.appendChild(fila);
        }

        comparador = valor_1.value;
        console.log(iteracion);
        console.log(resultado);
    });

    boton_reinicio.addEventListener('click', function () {
        location.reload();
    });
});