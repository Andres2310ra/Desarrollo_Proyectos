'Use Strict'

document.addEventListener('DOMContentLoaded', function () {

    const valor_1 = Math.floor(Math.random() * 100) + 1;
    let Valor_2 = Math.floor(Math.random() * 100) + 1;

    // valor_1=1
    Valor_2 = Math.floor(Math.random() * 100) + 1; //Math.floor(Math.random() * 3) + 1

    let Resultado_Suma = valor_1 + Valor_2;
    let Resultado_Resta = valor_1 - Valor_2;
    let Resultado_Multiplicacion = valor_1 * Valor_2;
    let Resultado_Division = valor_1 / Valor_2;
    let Resultado_Resto = valor_1 % Valor_2;

    //Tipos de Datos
    let entero = Math.floor(Math.random() * 100) + 1;
    let decimal = Math.random() * 100 + 1;
    let cadena = 'Hola Mundo';
    let booleano = true;
    let nulo = null;
    let indefinido = undefined;
    let arreglo = [10, 20, 30, 40, 50];
    let objeto = {
        nombre: 'Juan',
        apellido: 'Perez',
        edad: 30
    };
    //

    //Condicionales
    //Condicional If
    if (Valor_2 > valor_1) {
        document.getElementById('condicional_if').textContent = 'Condicional If: El valor 2 es mayor que el valor 1';
    } else if (Valor_2 < valor_1) {
        document.getElementById('condicional_if').textContent = 'Condicional If: El valor 1 es mayor que el valor 2'
    } else if (Valor_2 < 10 && valor_1 < 10 && Valor_2 != valor_1) {
        document.getElementById('condicional_if').textContent = 'Condicional If: Los valores son menores a 10 y son diferentes'
    } else {
        Swal.fire("Condicional If: Los Valores son Iguales")
    };

    //Switch
    switch (Valor_2) {
        case 20:
            Swal.fire("Condicional Switch: El valor 2 es 20")
            break;
        case 40:
            Swal.fire("Condicional Switch: El valor 2 es 40")
            break;
        case 50:
            Swal.fire("Condicional Switch: El valor 2 es 50")
            break;
        default:
            document.getElementById('condicional_switch').textContent = 'Condicional Switch: El valor 2 es diferente de 20, 40 y 50';
    }
    //

    document.getElementById('resultado_Suma').textContent = 'El resultado de la suma es: ' + Resultado_Suma;
    document.getElementById('resultado_Resta').textContent = 'El resultado de la resta es: ' + Resultado_Resta;
    document.getElementById('resultado_Multiplicacion').textContent = 'El resultado de la multiplicación es: ' + Resultado_Multiplicacion;
    document.getElementById('resultado_Division').textContent = 'El resultado de la división es: ' + Resultado_Division;
    document.getElementById('resultado_Resto').textContent = 'El resultado del resto o residuo es: ' + Resultado_Resto;

    document.getElementById('valor_1').textContent = 'El valor 1 aleatorio es: ' + valor_1;
    document.getElementById('valor_2').textContent = 'El valor 2 aleatorio es: ' + Valor_2;

    //Tipo de Datos concatenados a typeoff (Devuelve el tipo de dato)
    document.getElementById('entero').textContent = 'Número: ' + entero + ' /' + typeof (entero);
    document.getElementById('decimal').textContent = 'Decimal: ' + decimal + ' /' + typeof (decimal);
    document.getElementById('cadena').textContent = 'Texto: ' + cadena + ' /' + typeof (cadena);
    document.getElementById('booleano').textContent = 'Booleano: ' + booleano + ' /' + typeof (booleano);
    document.getElementById('nulo').textContent = 'Nulo: ' + nulo + ' /' + typeof (nulo);
    document.getElementById('indefinido').textContent = 'Indefinido: ' + indefinido + ' /' + typeof (indefinido);
    document.getElementById('arreglo').textContent = 'Arreglo: ' + arreglo + ' /' + typeof (arreglo);
    document.getElementById('objeto').textContent = 'Objeto: ' + objeto.nombre + ' ' + objeto.apellido + ' ' + objeto.edad + ' /' + typeof (objeto);
    //

    //Ciclos o Bucles
    const numero_1 = Math.floor(Math.random() * 100) + 1;
    const numero_2 = Math.floor(Math.random() * 100) + 1;
    const numero_3 = Math.floor(Math.random() * 100) + 1;
    let numeros = [];
    let numeros_2 = [];
    let numeros_3 = [];
    let i = 0;  //Variable de Control

    //Ciclo For
    let ciclo_for = '';
    for (i = 0; i < numero_1; i++) {
        if ((i + 1) % 2 == 0) {
            numeros.push(i + 1);
        }
    }

    // Encontrar números primos en el rango de 1 a numero_2
    let x = 0;  //Variable de Control
    let primos = []; // Definir la variable primos

    for (let num = 2; num <= numero_1; num++) {
        let esPrimo = true;
        for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
            if (num % divisor == 0) {
                esPrimo = false;
                break;
            }
        }
        if (esPrimo) {
            primos.push(num);
        }
    }

    // console.log(numeros_2);
    // console.log(primos);

    //console.log(numeros);
    ciclo_for += numeros.join(',');
    document.getElementById('ciclo_for').textContent = 'Ciclo For del numero ' + numero_1 + ': ' + ciclo_for;
    document.getElementById('list_for').textContent = 'Cadena de Datos Optenida : ' + ciclo_for.length;
    document.getElementById('list_par').textContent = 'Numeros Pares Obtenidos : ' + numeros.length;
    document.getElementById('list_primo').textContent = 'Numeros Primos Obtenidos : ' + primos;

    //Ciclo While
    let ciclo_while = '';

    while (x < numero_2) {
        if ((x + 1) % 2 == 0) {
            numeros_2.push(x + 1);
        }
        x++;
    }

    ciclo_while += numeros_2.join(',');
    document.getElementById('ciclo_while').textContent = 'Ciclo While del numero ' + numero_2 + ': ' + ciclo_while;
    document.getElementById('list_while').textContent = 'Numero de numeros iterados : ' + ciclo_while.length;

    //Ciclo Do While
    let ciclo_do_while = '';
    i = 0; // Reiniciar el valor de i
    do {
        numeros_3.push(i + 1);
        i++;
    } while (i < numero_3);
    ciclo_do_while += numeros_3.join(',');
    document.getElementById('ciclo_do_while').textContent = 'Ciclo Do While del numero ' + numero_3 + ': ' + ciclo_do_while;
    document.getElementById('list_do_while').textContent = 'Numero de numeros iterados : ' + numeros_3.length;
    //

    document.getElementById('actualizar_page').addEventListener('click', function () {

        let confirmar = confirm("¿Desea Actualizar la Página?");

        console.log(confirmar);
    
        if (confirmar=true) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cargando Nuevo Resultado",
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                location.reload();
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Operación Cancelada",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

});