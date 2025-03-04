'Use Strict'

document.addEventListener('DOMContentLoaded', function () {

    let valor_1 = Math.floor(Math.random() * 100) + 1;
    let Valor_2 = Math.floor(Math.random() * 100) + 1;
    let Resultado = valor_1 + Valor_2;

    document.getElementById('resultado').textContent = 'El resultado de la suma es: ' + Resultado;
    document.getElementById('valor_1').textContent = 'El valor 1 aleatorio es: ' + valor_1;
    document.getElementById('valor_2').textContent = 'El valor 2 aleatorio es: ' + Valor_2;

    document.getElementById('actualizar_page').addEventListener('click', function () {

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Cargando Nuevo Resultado",
            showConfirmButton: false,
            timer: 1500
        }).then(function () {
            location.reload();
        });
    });
});