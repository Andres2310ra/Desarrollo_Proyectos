let ataqueJugador
let ataqueEnemigo

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('btn-fuego')
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById('btn-agua')
    botonAgua = addEventListener('click', ataqueAgua)

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
        spanMascotaJugador.innerHTML = "Hipodoge"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
    } else {
        alert('Debes seleccionar una mascota')
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigo = ['Hipodoge', 'Capipepo', 'Ratigueya']
    let mascotaAleatoria = aleatorio(0, 2)
    return mascotaEnemigo[mascotaAleatoria]
}

function seleccionarAtaqueEnemigo(){
    let mascotaAtaque = ['Fuego', 'Agua', 'Tierra']
    let ataqueAleatorio = aleatorio(0, 2)
    return mascotaAtaque[ataqueAleatorio]
}

function ataqueFuego() {
    ataqueJugador = "Fuego "
    ataqueEnemigo=seleccionarAtaqueEnemigo()
    alert(ataqueJugador + ataqueEnemigo)
}

function ataqueAgua() {
    ataqueJugador = "Agua "
    ataqueEnemigo=seleccionarAtaqueEnemigo()
    alert(ataqueJugador + ataqueEnemigo)
}

function ataqueTierra() {
    ataqueJugador = "Tierra "
    ataqueEnemigo=seleccionarAtaqueEnemigo()
    alert(ataqueJugador + ataqueEnemigo)
}

window.addEventListener('load', iniciarJuego)