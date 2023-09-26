let ataqueJugador = ''
let ataqueEnemigo = ''
let vidasJugador = 3
let vidasEnemigo = 3
let spanMascotaJugador = ''
let spanMascotaEnemigo = ''

function iniciarJuego() {
    let seleccionarMascotaStyle = document.getElementById('seleccionar-mascota')
    seleccionarMascotaStyle.addEventListener('click', styleMascotaJugador)

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('btn-fuego')
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById('btn-agua')
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra = document.getElementById('btn-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let reiniciar = document.getElementById('btn-reiniciar')
    reiniciar.addEventListener('click', reiniciarJuego)
}

function styleMascotaJugador() {

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')

    let tarjeta1 = document.getElementById('t-1')
    let tarjeta2 = document.getElementById('t-2')
    let tarjeta3 = document.getElementById('t-3')

    let tarjetaSeleccionada1 = document.getElementById('t1-select')
    let tarjetaSeleccionada2 = document.getElementById('t2-select')
    let tarjetaSeleccionada3 = document.getElementById('t3-select')

    if (inputHipodoge.checked) {
        tarjeta1.style.border = '2px solid white'
        tarjeta1.style.outline = '2px solid white'
        tarjeta1.style.backgroundColor = 'transparent'
        tarjetaSeleccionada1.innerHTML = 'Selected'

        tarjeta2.style.border = '2px solid #007200'
        tarjeta2.style.outline = '2px solid #006400'
        tarjeta2.style.backgroundColor = '#3b302f'
        tarjetaSeleccionada2.innerHTML = ''

        tarjeta3.style.border = '2px solid #007200'
        tarjeta3.style.outline = '2px solid #006400'
        tarjeta3.style.backgroundColor = '#3b302f'
        tarjetaSeleccionada3.innerHTML = ''

    } else if (inputCapipepo.checked) {
        tarjeta2.style.border = '2px solid white'
        tarjeta2.style.outline = '2px solid white'
        tarjeta2.style.backgroundColor = 'transparent'
        tarjetaSeleccionada2.innerHTML = 'Selected'

        tarjeta3.style.border = '2px solid #007200'
        tarjeta3.style.outline = '2px solid #006400'
        tarjeta3.style.backgroundColor = '#3b302f'
        tarjetaSeleccionada3.innerHTML = ''

        tarjeta1.style.border = '2px solid #007200'
        tarjeta1.style.outline = '2px solid #006400'
        tarjeta1.style.backgroundColor = '#3b302f'
        tarjetaSeleccionada1.innerHTML = ''

    } else if (inputRatigueya.checked) {
        tarjeta3.style.border = '2px solid white'
        tarjeta3.style.outline = '2px solid white'
        tarjeta3.style.backgroundColor = 'transparent'
        tarjetaSeleccionada3.innerHTML = 'Selected'

        tarjeta1.style.border = '2px solid #007200'
        tarjeta1.style.outline = '2px solid #006400'
        tarjeta1.style.backgroundColor = '#3b302f'
        tarjetaSeleccionada1.innerHTML = ''

        tarjeta2.style.border = '2px solid #007200'
        tarjeta2.style.outline = '2px solid #006400'
        tarjeta2.style.backgroundColor = '#3b302f'
        tarjetaSeleccionada2.innerHTML = ''

    }

}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    spanMascotaJugador = document.getElementById('mascota-jugador')
    spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Carlitos"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()

        let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
        sectionSeleccionarAtaque.style.display = 'block'

        let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
        sectionSeleccionarMascota.style.display = 'none'

    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Chamuko"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()

        let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
        sectionSeleccionarAtaque.style.display = 'block'

        let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
        sectionSeleccionarMascota.style.display = 'none'

    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Angelina"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()

        let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
        sectionSeleccionarAtaque.style.display = 'block'

        let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
        sectionSeleccionarMascota.style.display = 'none'

    } else {
        Swal.fire(
            'Selecciona una Mascota',
            'Sin Mascota no Puedes Jugar',
            'error'
        )
    }
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
    if (!spanMascotaJugador == '') {
        ataqueJugador = "Fuego"
        ataqueEnemigo = seleccionarAtaqueEnemigo()
        combate()
    }
}

function ataqueAgua() {
    if (!spanMascotaJugador == '') {
        ataqueJugador = "Agua"
        ataqueEnemigo = seleccionarAtaqueEnemigo()
        combate()
    }
}

function ataqueTierra() {
    if (!spanMascotaJugador == '') {
        ataqueJugador = "Tierra"
        ataqueEnemigo = seleccionarAtaqueEnemigo()
        combate()
    }
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
        mensajeJuego(" - Sin daños 😮, Aumento de Vida")
        spanVidasJugador.innerHTML = ''
        spanVidasEnemigo.innerHTML = ''
        //vidasJugador++
        //vidasEnemigo++

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

    if (vidasJugador == 0) {
        Swal.fire(
            '¡La Batalla Estuvo Dificil!',
            'Tu Mascota Perdio la Batalla',
            'error'
        )
        spanVidasJugador.innerHTML = 0

        let botonFuego = document.getElementById('btn-fuego')
        botonFuego.disabled = true

        let botonAgua = document.getElementById('btn-agua')
        botonAgua.disabled = true

        let botonTierra = document.getElementById('btn-tierra')
        botonTierra.disabled = true

        let sectionReiniciar = document.getElementById('reiniciar')
        sectionReiniciar.style.display = 'block'

    } else if (vidasEnemigo == 0) {
        Swal.fire(
            '¡Buen Trabajo!',
            'Tu Mascota Gano la Batalla',
            'success'
        )
        spanVidasEnemigo.innerHTML = 0

        let botonFuego = document.getElementById('btn-fuego')
        botonFuego.disabled = true

        let botonAgua = document.getElementById('btn-agua')
        botonAgua.disabled = true

        let botonTierra = document.getElementById('btn-tierra')
        botonTierra.disabled = true

        let sectionReiniciar = document.getElementById('reiniciar')
        sectionReiniciar.style.display = 'block'
    }

}

function mensajeJuego(resultado) {
    let sectionMensaje = document.getElementById('mensajes')
    let mensaje = document.createElement('p')

    mensaje.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + resultado

    sectionMensaje.appendChild(mensaje)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
