let ganador = 0
let perdedor = 0
let rondas_ganadas = 0
let rondas_perdidas = 0

function toggleButtons() {
    var startButton = document.getElementById("startButton")
    var buttonContainer = document.getElementById("buttonContainer")

    var ganadasSpan = document.getElementById("ganadasSpan")
    var perdidasSpan = document.getElementById("perdidasSpan")
    var ganadasSpan_Pun = document.getElementById("ganadasSpan_Pun")
    var perdidasSpan_Pun = document.getElementById("perdidasSpan_Pun")

    if (buttonContainer.style.display = "none") {

        buttonContainer.style.display = "block"
        startButton.textContent = "Restaurar 🔄"
    } else {

        buttonContainer.style.display = "none"
        startButton.textContent = "Start 🎮"
    }

    rondas_ganadas = 0
    rondas_perdidas = 0
    ganador = 0
    perdedor = 0

    ganadasSpan.textContent = rondas_ganadas
    perdidasSpan.textContent = rondas_perdidas
    ganadasSpan_Pun.textContent = ganador
    perdidasSpan_Pun.textContent = perdedor

}


function juego(jugador) {

    var ganadasSpan = document.getElementById("ganadasSpan");
    var perdidasSpan = document.getElementById("perdidasSpan");
    var ganadasSpan_Pun = document.getElementById("ganadasSpan_Pun")
    var perdidasSpan_Pun = document.getElementById("perdidasSpan_Pun")

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function seleccion(jugada) {
        let resultado = ""

        if (jugada == 1) {
            resultado = "🪨"
        } else if (jugada == 2) {
            resultado = "🧻"
        } else if (jugada == 3) {
            resultado = "✂️"
        }
        return resultado
    }


    let maquina = aleatorio(1, 3)

    if (jugador == 1 && maquina == 3 || jugador == 2 && maquina == 1 || jugador == 3 && maquina == 2) {

        Swal.fire({
            icon: 'success',
            title: "Elegiste " + seleccion(jugador) + " y la PC eligio " + seleccion(maquina),
            text: 'Ganaste',
            showConfirmButton: false,
            timer: 2000
        })
        ganador++
        ganadasSpan_Pun.textContent = ganador

    } else if (jugador == maquina) {

        Swal.fire({
            icon: 'info',
            title: "Elegiste " + seleccion(jugador) + " y la PC eligio " + seleccion(maquina),
            text: 'Es un Empate',
            showConfirmButton: false,
            timer: 2000
        })

    } else {
        Swal.fire({
            icon: 'error',
            title: "Elegiste " + seleccion(jugador) + " y la PC eligio " + seleccion(maquina),
            text: 'Perdiste',
            showConfirmButton: false,
            timer: 2000
        })
        perdedor++
        perdidasSpan_Pun.textContent = perdedor
    }

    if (ganador == 3) {
        
        rondas_ganadas++
        ganadasSpan.textContent = rondas_ganadas
        ganador = 0
        perdedor = 0
        ganadasSpan_Pun.textContent = ganador
        perdidasSpan_Pun.textContent = perdedor

        Swal.fire(
            '¡Ganaste la Ronda 😁! \n' + 
            "En tu ultima jugada\n" +
            "Elegiste " + seleccion(jugador) + " y la PC eligio " + seleccion(maquina),
            'Exelente Jugada',
            'success'
        )

    } else if (perdedor == 3) {
        rondas_perdidas++
        perdidasSpan.textContent = rondas_perdidas
        ganador = 0
        perdedor = 0
        ganadasSpan_Pun.textContent = ganador
        perdidasSpan_Pun.textContent = perdedor

        Swal.fire(
            '¡Perdiste la Ronda 🥶! \n' +
            "En tu ultima jugada\n" +
            "Elegiste " + seleccion(jugador) + " y la PC eligio " + seleccion(maquina),
            'Te Gano la PC',
            'error'
        )

    } else if (ganador==2 && perdedor==2){
        Swal.fire(
            '¡Puntos Igualados 😮! \n' +
            "¿Quien ganara?\n" +
            "Elegiste " + seleccion(jugador) + " y la PC eligio " + seleccion(maquina),
            'Es un Empate',
            'question'
        )

    }

}
