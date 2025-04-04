'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let funcion = document.getElementById('funcion');
    let btn_cal = document.getElementById('btn-cal');
    let parametros = document.getElementById('parametros');
    let btn_parametros = document.getElementById('btn-parametros');
    let funcion_rest = document.getElementById('funcion_rest_spread');
    let btn_rest = document.getElementById('btn-rest-spread');
    let funcion_anomima_callback = document.getElementById('funcion_anomima_callback');
    let btn_anomima_callback = document.getElementById('btn-anonima_callback');
    let funcion_flecha = document.getElementById('funcion_flecha');
    let funcion_flecha2 = document.getElementById('funcion_flecha2');
    let btn_funcion_flecha = document.getElementById('btn-funcion_flecha');
    let numero = 0;
    let valor_anterior = 0;

    function suma(valor) {
        const resultado = 'El valor retornado es: ' + Number(valor);

        return resultado;
    }

    btn_cal.addEventListener('click', function () {

        let total = 0;

        total = numero + valor_anterior;

        if (total === 0) {
            Swal.fire({
                title: "Al dar click en el botón se generará un número aleatorio entre 1 y 10, el cual se sumará al valor anterior",
                text: "El proceso se repetirá hasta que la suma de todos los números sea mayor o igual a 100",
                icon: "success",
                draggable: true
            });
        }

        numero = Math.floor(Math.random() * 10) + 1;

        console.log('total: ' + numero + ' + ' + valor_anterior + ' = ' + total);

        if (total >= 100) {

            funcion.innerHTML = 'Proceso Terminado, la suma de todos los numeros es mayor igual a 100: ' + total;
            valor_anterior = 0;
            total = 0;
            numero = 0;
        } else {
            funcion.innerHTML = suma(total);
        }
        valor_anterior = total;
    });

    function calculadora(operacion, primo = true) {
        const resultado = eval(operacion);
        let es_primo = [];

        for (let i = 2; i <= resultado; i++) {

            if (resultado % i == 0) {
                es_primo.push(i);
            }

            if (es_primo.length > 1) {
                primo = false;
            } else {
                primo = true;
            }
        }

        if (primo == true) {
            return resultado;
        } else {
            Swal.fire({
                title: "El numero ingresado no es un número primo",
                text: "Por favor, ingresa un número primo",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/sites/img/cielo nocturno detallado con constelaciones y estrellas fugaces.png)",
                backdrop: `
                      rgba(0,0,123,0.4)
                      url("https://media0.giphy.com/media/iIPI1tpT9HcUE/200.webp?cid=790b76117p1kjbi8uec8oekzcursc44nzvdfkkv7mygwmbbc&ep=v1_gifs_search&rid=200.webp&ct=g")
                      left top
                      repeat
                    `
            });

            return 'El  número  ingresado  no  es  un  número  primo'
        }
    }

    btn_parametros.addEventListener('click', function () {
        Swal.fire({
            title: "Parametros: Ingresa una operación matemática que de como resultado un número primo",
            input: "text",
            inputAttributes: {
                pattern: "[0-9+\\-*/()]*"
            },
            icon: "success",
            draggable: true,
            didOpen: () => {
                const input = Swal.getInput();
                input.addEventListener('input', () => {
                    input.value = input.value.replace(/[^0-9+\-*/()]/g, '');
                });
            },
            preConfirm: (value) => {
                if (!/^[0-9+\-*/()]*$/.test(value)) {
                    Swal.showValidationMessage('Por favor, ingresa solo números y los caracteres +, -, /, *, ().');
                    return false;
                } else {
                    parametros.innerHTML = 'Muy bien el numero ' + calculadora(value) + ' es un número primo';
                }
            }
        });
    });

    function ClasificarPalabras(...palabras) {
        const palabras_largas = palabras.filter(palabra => palabra.length > 5);
        const palabras_cortas = palabras.filter(palabra => palabra.length <= 5);
        return { palabras_cortas, palabras_largas };
    }

    btn_rest.addEventListener('click', function () {
        Swal.fire({
            title: "A continuacion ingresa las palabras que desees clasificar",
            text: "Las palabras se clasificarán en palabras largas y palabras cortas",
            icon: "success",
            draggable: true
        }).then(() => {
            Swal.fire({
                title: "Ingresa las palabras separadas por comas, (PARAMETRO REST)",
                input: 'text',
                inputAttributes: {
                    pattern: "[A-Za-z, ]*" // Permitir letras, comas y espacios
                },
                icon: "success",
                draggable: true,
                showCancelButton: true
            }).then(result => {

                //Parametro REST

                if (result.isConfirmed) {
                    const palabras = result.value.split(',').map(palabra => palabra.trim());
                    const clasificacion = ClasificarPalabras(...palabras);
                    console.log(clasificacion);
                    funcion_rest.innerHTML = `Palabras Largas: ${clasificacion.palabras_largas.join(', ')}<br>Palabras Cortas: ${clasificacion.palabras_cortas.join(', ')}`;

                    Swal.fire({
                        title: "Deseas clasificar mas palabras?, (PARAMETRO SPREAD)",
                        input: 'text',
                        inputAttributes: {
                            pattern: "[A-Za-z, ]*" // Permitir letras, comas y espacios
                        },
                        icon: "success",
                        draggable: true,
                        showCancelButton: true
                    }).then(result2 => {

                        //Parametro SPREAD

                        if (result2.isConfirmed) {
                            const palabras2 = result2.value.split(',').map(palabra => palabra.trim());
                            const clasificacion2 = ClasificarPalabras(...palabras, ...palabras2);
                            console.log(clasificacion, clasificacion2);
                            funcion_rest.innerHTML = `Palabras Largas: ${clasificacion2.palabras_largas.join(', ')}<br>Palabras Cortas: ${clasificacion2.palabras_cortas.join(', ')}`;
                        }
                    });

                } else {
                    Swal.fire({
                        title: "Operación Cancelada",
                        icon: "error",
                        draggable: true
                    });
                }
            });
        });
    });

    function palabra_ingresada(palabra, palabra_escrita, palabra_alreves) {
        const escrita = palabra_escrita(palabra);
        const alreves = palabra_alreves(palabra);
        return `${escrita} ${alreves}`;
    }

    btn_anomima_callback.addEventListener('click', function () {
        Swal.fire({
            title: "Ingresa una palabra para invertirla",
            text: "La palabra se invertirá y se mostrará en la consola",
            input: 'text',
            icon: "success",
            draggable: true,
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                funcion_anomima_callback.innerHTML = palabra_ingresada(result.value,
                    valor1 => {
                        console.log('La palabra ingresada es: ' + valor1)
                        return 'La palabra ingresada es: ' + valor1
                    }, valor2 => {
                        console.log(' y la palabra al reves es: ' + valor2.split('').reverse('').join(''))
                        return ' y la palabra al reves es: ' + valor2.split('').reverse('').join('')
                    })
            }
        });
    });

    btn_funcion_flecha.addEventListener('click', function () {
        let valor1 = Math.floor(Math.random() * 1000) + 1;
        let valor2 = Math.floor(Math.random() * 1000) + 1;

        let suma = (a, b) => a + b;

        funcion_flecha.innerHTML = `Se realizo la funcion let suma = (a, b) => a + b;, esta suma dos numeros aleatorios, la suma de ${valor1} y ${valor2} es igual a ${suma(valor1, valor2)}`

        Swal.fire({
            title: "Ingresa una palabra",
            text: "Se mostrara cada letra impresa en la consola.",
            input: 'text',
            icon: "success",
            draggable: true,
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                let palabra = result.value.split('')
                funcion_flecha2.innerHTML='';
                funcion_flecha2.innerHTML=`Se realizo la funcion palabra.forEach(element => {
                    console.log(element)
                    funcion_flecha2.innerHTML += element 
                });, esta imprime como arreglo la palabra ingresada por linea.`

                console.log(palabra)
                palabra.forEach(element => {
                    console.log(element)
                    funcion_flecha2.innerHTML += '<p>' + element + '</p>' 
                });

            }
        })
    })

});