let seleccionarMascotaStyle = document.getElementById('seleccionar-mascota')
let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
let mensaje = document.getElementById('mensaje-batalla')
let sectionReiniciar = document.getElementById('reiniciar')
let botonMascotaJugador = document.getElementById('boton-mascota')
let botonFuego = document.getElementById('btn-fuego')
let botonAgua = document.getElementById('btn-agua')
let botonTierra = document.getElementById('btn-tierra')
let reiniciar = document.getElementById('btn-reiniciar')

let inputHipodoge = document.getElementById('hipodoge')
let inputCapipepo = document.getElementById('capipepo')
let inputRatigueya = document.getElementById('ratigueya')

let tarjeta1 = document.getElementById('t-1')
let tarjeta2 = document.getElementById('t-2')
let tarjeta3 = document.getElementById('t-3')
let tarjetaSeleccionada1 = document.getElementById('t1-select')
let tarjetaSeleccionada2 = document.getElementById('t2-select')
let tarjetaSeleccionada3 = document.getElementById('t3-select')

let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

let spanVidasJugador = document.getElementById('vidas-jugador')
let spanVidasEnemigo = document.getElementById('vidas-enemigo')

let sectionMensaje = document.getElementById('resultado')
let ataqueDelJugador = document.getElementById('ataque-jugador')
let ataqueDelEnemigo = document.getElementById('ataque-enemigo')

let ataqueJugador = ''
let ataqueEnemigo = ''
let vidasJugador = 3
let vidasEnemigo = 3
let spanMascotaJugador = ''
let spanMascotaEnemigo = ''

function iniciarJuego() {
    seleccionarMascotaStyle.addEventListener('click', styleMascotaJugador)
    sectionSeleccionarAtaque.style.display = 'none'
    mensaje.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    reiniciar.addEventListener('click', reiniciarJuego)
}

function styleMascotaJugador() {

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

    spanMascotaJugador = document.getElementById('mascota-jugador')
    spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Carlitos"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'

    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Chamuko"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'

    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Angelina"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()
        sectionSeleccionarAtaque.style.display = 'flex'
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
    let vida = '❤️'

    mensaje.style.display = 'flex'

    if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra" || ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") {
        mensajeJuego("Daño al Enemigo 🎉")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = ''
        spanVidasJugador.innerHTML = ''

    } else if (ataqueJugador == ataqueEnemigo) {
        mensajeJuego("Sin daños 😮, Ataques Igualados")
        spanVidasJugador.innerHTML = ''
        spanVidasEnemigo.innerHTML = ''
        //vidasJugador++
        //vidasEnemigo++

    } else {
        mensajeJuego("Te han hecho Daño 🥶")
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
        spanVidasJugador.innerHTML = '☠️'
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        sectionReiniciar.style.display = 'block'

    } else if (vidasEnemigo == 0) {
        Swal.fire(
            '¡Buen Trabajo!',
            'Tu Mascota Gano la Batalla',
            'success'
        )
        spanVidasEnemigo.innerHTML = '☠️'
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        sectionReiniciar.style.display = 'block'
    }

}

function mensajeJuego(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)