let ataqueJugador = ''
let ataqueEnemigo = ''
let vidasJugador = 3
let vidasEnemigo = 3
let spanMascotaJugador = ''
let spanMascotaEnemigo = ''

function iniciarJuego() {
    let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display='none'

    let sectionReiniciar=document.getElementById('reiniciar')
    sectionReiniciar.style.display='none'
    
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
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    spanMascotaJugador = document.getElementById('mascota-jugador')
    spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Carlitos"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()

        let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
        sectionSeleccionarAtaque.style.display='block'

        let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
        sectionSeleccionarMascota.style.display='none'

    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Chamuko"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()

        let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
        sectionSeleccionarAtaque.style.display='block'

        let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
        sectionSeleccionarMascota.style.display='none'

    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Angelina"
        spanMascotaEnemigo.innerHTML = seleccionarMascotaEnemigo()

        let sectionSeleccionarAtaque=document.getElementById('seleccionar-ataque')
        sectionSeleccionarAtaque.style.display='block'

        let sectionSeleccionarMascota=document.getElementById('seleccionar-mascota')
        sectionSeleccionarMascota.style.display='none'

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
            botonFuego.disabled=true
        
            let botonAgua = document.getElementById('btn-agua')
            botonAgua.disabled=true
        
            let botonTierra = document.getElementById('btn-tierra')
            botonTierra.disabled=true

            let sectionReiniciar=document.getElementById('reiniciar')
            sectionReiniciar.style.display='block'

        } else if (vidasEnemigo == 0) {
            Swal.fire(
                '¡Buen Trabajo!',
                'Tu Mascota Gano la Batalla',
                'success'
            )
            spanVidasEnemigo.innerHTML = 0

            let botonFuego = document.getElementById('btn-fuego')
            botonFuego.disabled=true
        
            let botonAgua = document.getElementById('btn-agua')
            botonAgua.disabled=true
        
            let botonTierra = document.getElementById('btn-tierra')
            botonTierra.disabled=true

            let sectionReiniciar=document.getElementById('reiniciar')
            sectionReiniciar.style.display='block'
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
