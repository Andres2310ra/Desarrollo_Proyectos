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
    let a_funcion_indexOf = document.getElementById('a_funcion_indexOf');
    let a_funcion_lastIndexOf = document.getElementById('a_funcion_lastIndexOf');
    let a_funcion_find = document.getElementById('a_funcion_find');
    let a_funcion_finIndex = document.getElementById('a_funcion_finIndex');
    let a_funcion_includes = document.getElementById('a_funcion_includes');
    let a_funcion_some = document.getElementById('a_funcion_some');
    let a_funcion_every = document.getElementById('a_funcion_every');
    let s_funcion_indexOf = document.getElementById('s_funcion_indexOf');
    let s_funcion_lastIndexOf = document.getElementById('s_funcion_lastIndexOf');
    let s_funcion_includes = document.getElementById('s_funcion_includes');
    let s_funcion_starsWith = document.getElementById('s_funcion_starsWith');
    let s_funcion_endsWith = document.getElementById('s_funcion_endsWith');
    let s_funcion_match = document.getElementById('s_funcion_match');
    let s_funcion_search = document.getElementById('s_funcion_search');
    let btn_metodos_busqueda = document.getElementById('btn-metodos_busqueda');
    let arrays_0 = document.getElementById('array');
    let operation_1 = document.getElementById('count');
    let count_2 = document.getElementById('count_2');
    let btn_array = document.getElementById('btn-array');
    let btn_operation = document.getElementById('btn-operation');
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
                funcion_flecha2.innerHTML = '';
                funcion_flecha2.innerHTML = `Se realizo la funcion palabra.forEach(element => {
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

    btn_metodos_busqueda.addEventListener('click', function () {

        const frases = [
            "Las ballenas azules pueden medir hasta 30 metros de longitud.",
            "Las orcas, aunque se llaman ballenas asesinas, en realidad son delfines grandes.",
            "Las ballenas jorobadas son famosas por sus impresionantes saltos fuera del agua.",
            "Las ballenas utilizan sonidos para comunicarse a grandes distancias en el océano.",
            "Las ballenas minke son una de las especies más pequeñas de ballenas."
        ];

        let aleatorio = Math.floor(Math.random() * frases.length)
        let fraseAleatoria = frases[aleatorio]

        console.log(fraseAleatoria)

        function resultSearch(frase) {
            //Array
            a_funcion_indexOf.innerHTML = `<br> <b>La busqueda de la frase leida tiene el numero: ${frases.indexOf(fraseAleatoria) + 1}</b>`

            a_funcion_lastIndexOf.innerHTML = `<br> <b>La busqueda de la frase que le sigue a la frase actual es: " ${frases[aleatorio + 1]}", la frase es el numero ${frases.lastIndexOf(frases[aleatorio + 1]) + 1}</b>`

            a_funcion_find.innerHTML = `<br> <b>La busqueda de la frase anterior a la actual es: "${frases.find(frase => frase == frases[aleatorio])}", la frase es el numero ${aleatorio}.</b>`

            a_funcion_finIndex.innerHTML = `<br> <b>El indice de la frase leida es: ${frases.findIndex(frase => frase == fraseAleatoria)}</b>`

            a_funcion_includes.innerHTML = `<b> <br>La frase leida se encuetra en el array: ${frases.includes(fraseAleatoria)}</b>`

            a_funcion_some.innerHTML = `<b> <br> La frase "La ballena de prueba" no se encutra en el array: ${frases.some(frase => frase == "La ballena de prueba")}</b>`

            a_funcion_every.innerHTML = `<b> <br>La palabra "${frase}" se encuentra en todas las frases: ${frases.every(palabra => palabra.includes(frase))}</br>`

            //String

            s_funcion_indexOf.innerHTML = `<b> <br>El indece de la palabra "${frase}" es el numero: ${fraseAleatoria.indexOf(frase)}</b>`

            s_funcion_lastIndexOf.innerHTML = `<b> <br>El indece de la palabra "${frase}" es el numero: ${fraseAleatoria.lastIndexOf(frase)}</b>`

            s_funcion_includes.innerHTML = `<b> <br>La palabra "${frase}" se encuentra en la frase leida: ${fraseAleatoria.includes(frase)}</b>`

            s_funcion_starsWith.innerHTML = `<b> <br>La frase leida empieza con la palabra "${frase}": ${fraseAleatoria.startsWith(frase)}</b>`

            s_funcion_endsWith.innerHTML = `<b> <br>La frase leida termina con la palabra "${frase}": ${fraseAleatoria.endsWith(frase)}</b>`

            s_funcion_match.innerHTML = `<b> <br>La frase leida tiene la palabra "${frase}": ${fraseAleatoria.match(frase)}</b>`

            s_funcion_search.innerHTML = `<b> <br>La frase leida tiene la palabra "${frase}": ${fraseAleatoria.search(frase)}</b>`
        }

        Swal.fire({
            title: "Se mostrara una frase aleatoria sobre ballenas de las 5 frases sobre cargadas en el array",
            icon: "success",
            draggable: true
        }).then(() => {
            Swal.fire({
                title: "Lee la siguiente frase y despues ingresa una palabra para buscarla",
                text: fraseAleatoria,
                input: 'text',
                icon: "success",
                draggable: true
            }).then(result => {
                if (result.isConfirmed) {
                    resultSearch(result.value)
                }
            })

        })

    })

    let numeros = [];

    function eliminar_numeros() {
        return new Promise((resolve) => {
            const eliminar = () => {
                Swal.fire({
                    title: "¿Quieres eliminar uno de los números guardados?",
                    text: "Ingresa el número que quieres eliminar: " + numeros.join(', '),
                    input: 'number',
                    inputAttributes: {
                        pattern: "[0-9/]*"
                    },
                    preConfirm: (value) => {
                        if (!value || isNaN(value)) {
                            Swal.showValidationMessage('Por favor, ingresa un número válido.');
                            return false;
                        }
                    },
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Terminar"
                }).then(result => {
                    if (result.isConfirmed) {
                        const value = Number(result.value);
                        const index = numeros.indexOf(value);
                        if (index === -1) {
                            Swal.fire({
                                title: "Número no encontrado",
                                text: "El número no está en la lista.",
                                icon: "error"
                            }).then(() => eliminar());
                        } else {
                            numeros.splice(index, 1);
                            console.log("Número eliminado: " + numeros);
                            eliminar();
                        }
                    } else {
                        arrays_0.innerHTML = `<b>Los números guardados en el array son: ${numeros.join(', ')}<br></b>`;
                        console.log("Números finales en el array: " + numeros);
                        resolve(numeros);
                    }
                });
            };

            eliminar();
        });
    }

    function array_numero() {
        return new Promise((resolve) => {
            const ingresar = () => {
                Swal.fire({
                    title: "Guarda una serie de números",
                    text: "Ingresa un número, luego presiona guardar o terminar",
                    input: 'number',
                    inputAttributes: {
                        pattern: "[0-9/]*"
                    },
                    preConfirm: (value) => {
                        if (!value || isNaN(value)) {
                            Swal.showValidationMessage('Por favor, ingresa un número válido.');
                            return false;
                        }
                    },
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Guardar",
                    cancelButtonText: "Terminar"
                }).then(result => {
                    if (result.isConfirmed) {
                        const numero = Number(result.value);
                        numeros.push(numero);
                        console.log("Número ingresado: " + numeros);
                        ingresar();
                    } else {
                        eliminar_numeros().then(resolve); // resolve con el array final
                    }
                });
            };

            ingresar();
        });
    }

    btn_array.addEventListener('click', async function () {
        const resultadoFinal = await array_numero(); // Espera que el usuario termine
    
        // ✅ Contar las repeticiones
        let conteo = {};
        for (let numero of resultadoFinal) {
            conteo[numero] = (conteo[numero] || 0) + 1;
        }
    
        // ✅ Mostrar resultados
        let mensajeConteo = "";
        for (let numero in conteo) {
            mensajeConteo += `El número ${numero} está ${conteo[numero]} ${conteo[numero] === 1 ? 'vez' : 'veces'}<br>`;
        }
        count_2.innerHTML = mensajeConteo;
    
        // ✅ Operaciones
        btn_operation.addEventListener('click', async function () {
            const { value: operation } = await Swal.fire({
                title: "Seleccione la operación que desea realizar",
                input: "select",
                inputOptions: {
                    operaciones: {
                        Suma: "Sumar",
                        Resta: "Restar",
                        Division: "Dividir",
                        Multiplicacion: "Multiplicar"
                    }
                },
                inputPlaceholder: "Seleccione una operación",
                showCancelButton: true
            });
    
            if (!operation) {
                Swal.fire("Selecciona una operación");
                return;
            }
    
            Swal.fire(`Seleccionaste: ${operation}`);
    
            let resultado;
            switch (operation) {
                case "Suma":
                    resultado = resultadoFinal.reduce((a, b) => a + b, 0);
                    break;
                case "Resta":
                    resultado = resultadoFinal.reduce((a, b) => a - b);
                    break;
                case "Division":
                    resultado = resultadoFinal.slice(1).reduce((a, b) => a / b, resultadoFinal[0]);
                    break;
                case "Multiplicacion":
                    resultado = resultadoFinal.reduce((a, b) => a * b, 1);
                    break;
            }
    
            operation_1.innerHTML = `<b>El resultado de la ${operation.toLowerCase()} es: ${resultado}</b>`;
        });
    });
    



});