let ataqueJugador = ''
let ataqueEnemigo = ''
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('btn-fuego')
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById('btn-agua')
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra = document.getElementById('btn-tierra')
    botonTierra.addEventListener('click', ataqueTierra)
}
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Carlitos"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Chamuko"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Angelina"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
    } else {
        alert('Debes seleccionar una mascota')
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigo = ['Carlitos', 'Chamuko', 'Angelina']
    let mascotaAleatoria = aleatorio(0, 2)
    return mascotaEnemigo[mascotaAleatoria]
}

function seleccionarAtaqueEnemigo() {
    let ataqueMascota = ['Fuego', 'Agua', 'Tierra']
    let ataqueAleatorio = aleatorio(0, 2)
    return ataqueMascota[ataqueAleatorio]
}

function ataqueFuego() {
    ataqueJugador = "Fuego"
    ataqueEnemigo = seleccionarAtaqueEnemigo()
    combate()
}

function ataqueAgua() {
    ataqueJugador = "Agua"
    ataqueEnemigo = seleccionarAtaqueEnemigo()
    combate()
}

function ataqueTierra() {
    ataqueJugador = "Tierra"
    ataqueEnemigo = seleccionarAtaqueEnemigo()
    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    let vida = '❤️'

    if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra" || ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") {
        mensajeJuego(" - Ganaste 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = ''
        spanVidasJugador.innerHTML = ''

    } else if (ataqueJugador == ataqueEnemigo) {
        mensajeJuego(" - Sin daños 😮")
        spanVidasJugador.innerHTML = ''
        spanVidasEnemigo.innerHTML = ''

    } else {
        mensajeJuego(" - Perdiste 🥶")
        vidasJugador--
        spanVidasEnemigo.innerHTML = ''
        spanVidasJugador.innerHTML = ''

    }

    for (let i = 0; i < vidasJugador; i++) {
        spanVidasJugador.innerHTML += vida
    }

    for (let i = 0; i < vidasEnemigo; i++) {
        spanVidasEnemigo.innerHTML += vida
    }

}

function mensajeJuego(resultado) {
    let sectionMensaje = document.getElementById('mensajes')
    let mensaje = document.createElement('p')

    mensaje.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + resultado

    sectionMensaje.appendChild(mensaje)
}

window.addEventListener('load', iniciarJuego)
