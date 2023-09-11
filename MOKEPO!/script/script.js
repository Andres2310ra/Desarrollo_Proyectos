function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
        spanMascotaEnemigo.innerHTML=seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
        spanMascotaEnemigo.innerHTML=seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
        spanMascotaEnemigo.innerHTML=seleccionarMascotaEnemigo()
    } else {
        alert('Debes seleccionar una mascota')
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigo = ['Hipodoge', 'Capipepo', 'Ratigueya']
    let mascotaAleatoria=aleatorio(0,2)
    return mascotaEnemigo[mascotaAleatoria]
}

window.addEventListener('load', iniciarJuego)