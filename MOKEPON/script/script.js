const seleccionarMascotaStyle = document.getElementById('seleccionar-mascota')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const mensaje = document.getElementById('mensaje-batalla')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const reiniciar = document.getElementById('btn-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensaje = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')
const contenedorTarjetas = document.getElementById('seleccion-de-mokepon')
const contenedorAtaques = document.getElementById('seleccion-de-ataque')
const sectionMapaCamvas = document.getElementById('ver-mapa-canvas')
const mapaCanvas = document.getElementById('mapa')
const titulo = document.getElementById('titulo')

let jugadorId = null
let mokepones = []
let ataqueJugador = ''
let ataqueEnemigo = ''
let opcionDeMokepones
let opcionDeAtaques
let moustruoSeleccionado
let moustruoEnemigoSeleccionado
let ataqueEnemigoSeleccionado
let ataqueSeleccionado
let ataquesDelJugador = []
let ataquesDelEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3
let spanMascotaJugador = ''
let spanMascotaEnemigo = ''
let botonFuego
let botonAgua
let botonTierra
let botonesAtaque = []
let modoJuegoPorMuerte
let modoJuegoPorVictorias
let lienzo = mapaCanvas.getContext("2d")
let mokeponSeleccionado
let intervalo
let mapabackground = new Image()
mapabackground.src = 'img/mapa.jpg'

//  Clase Mokepon 
class Mokepon {
    constructor(nombre, foto, canvas, vida) {
        this.nombre = nombre
        this.foto = foto
        this.canvas = canvas
        this.vida = vida
        this.ataque = []
        this.x = 240
        this.y = 250
        this.ancho = 100
        this.alto = 100
        this.imgMonster = new Image()
        this.imgMonster.src = canvas
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.imgMonster,
            this.x,
            this.y,
            this.alto,
            this.ancho
        );
    }
}

//  Objetos Mokepon 
let monster1 = new Mokepon('Dracarión', 'img/Monster_Mokepon/tarjeta_1.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_1.png', '3')
let monster2 = new Mokepon('Hidra', 'img/Monster_Mokepon/tarjeta_2.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_2.png', '3')
let monster3 = new Mokepon('Fenrir', 'img/Monster_Mokepon/tarjeta_3.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_3.png', '3')
let monster4 = new Mokepon('Quimera', 'img/Monster_Mokepon/tarjeta_4.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_4.png', '3')
let monster5 = new Mokepon('Gorgona', 'img/Monster_Mokepon/tarjeta_5.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_5.png', '3')
let monster6 = new Mokepon('Cerbero', 'img/Monster_Mokepon/tarjeta_6.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_6.png', '3')
let monster7 = new Mokepon('Basilisco', 'img/Monster_Mokepon/tarjeta_7.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_7.png', '3')
// let monster8 = new Mokepon('Arpía', 'img/Monster_Mokepon/tarjeta_8.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_8.png', '3')
// let monster9 = new Mokepon('Minotauro', 'img/Monster_Mokepon/tarjeta_9.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_9.png', '3')
// let monster10 = new Mokepon('Grifo', 'img/Monster_Mokepon/tarjeta_10.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_10.png', '3')
// let monster11 = new Mokepon('Cíclope', 'img/Monster_Mokepon/tarjeta_11.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_11.png', '3')
// let monster12 = new Mokepon('León De Nemea', 'img/Monster_Mokepon/tarjeta_12.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_12.png', '3')
// let monster13 = new Mokepon('Pájaro Del Trueno', 'img/Monster_Mokepon/tarjeta_13.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_13.png', '3')
// let monster14 = new Mokepon('Roc', 'img/Monster_Mokepon/tarjeta_14.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_14.png', '3')
// let monster15 = new Mokepon('Kraken', 'img/Monster_Mokepon/tarjeta_15.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_15.png', '3')
// let monster16 = new Mokepon('Wendigo', 'img/Monster_Mokepon/tarjeta_16.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_16.png', '3')
// let monster17 = new Mokepon('Centauro', 'img/Monster_Mokepon/tarjeta_17.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_17.png', '3')
// let monster18 = new Mokepon('Sirena', 'img/Monster_Mokepon/tarjeta_18.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_18.png', '3')
// let monster19 = new Mokepon('Mantícora', 'img/Monster_Mokepon/tarjeta_19.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_19.png', '3')
// let monster20 = new Mokepon('Lamía', 'img/Monster_Mokepon/tarjeta_20.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_20.png', '3')
// let monster21 = new Mokepon('Cíclope', 'img/Monster_Mokepon/tarjeta_21.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_21.png', '3')
// let monster22 = new Mokepon('Fénix', 'img/Monster_Mokepon/tarjeta_22.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_22.png', '3')
// let monster23 = new Mokepon('Yeti', 'img/Monster_Mokepon/tarjeta_23.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_23.png', '3')
// let monster24 = new Mokepon('Espectro', 'img/Monster_Mokepon/tarjeta_24.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_24.png', '3')
// let monster25 = new Mokepon('Wyvern', 'img/Monster_Mokepon/tarjeta_25.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_25.png', '3')
// let monster26 = new Mokepon('Alma', 'img/Monster_Mokepon/tarjeta_26.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_26.png', '3')
// let monster27 = new Mokepon('Ogro', 'img/Monster_Mokepon/tarjeta_27.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_27.png', '3')
// let monster28 = new Mokepon('Gárgola', 'img/Monster_Mokepon/tarjeta_28.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_28.png', '3')
// let monster29 = new Mokepon('Leviatán', 'img/Monster_Mokepon/tarjeta_29.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_29.png', '3')
// let monster30 = new Mokepon('Kaelen', 'img/Monster_Mokepon/tarjeta_30.gif', 'img/Imagenes_Tarjetas_Mokepon/tarjeta_30.png', '3')

monster1.ataque.push(
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🌱', id: 'btn-tierra' },
)
monster2.ataque.push(
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '🌱', id: 'btn-tierra' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🔥', id: 'btn-fuego' },
)
monster3.ataque.push(
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🔥', id: 'btn-fuego' },
    { nombre: '🌱', id: 'btn-tierra' },
)
monster4.ataque.push(
    { nombre: '⛈️', id: 'btn-tormenta' },
    { nombre: '⛈️', id: 'btn-tormenta' },
    { nombre: '⛈️', id: 'btn-tormenta' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🔥', id: 'btn-fuego' },
)
monster5.ataque.push(
    { nombre: '🌀', id: 'btn-viento' },
    { nombre: '🌀', id: 'btn-viento' },
    { nombre: '🌀', id: 'btn-viento' },
    { nombre: '💧', id: 'btn-agua' },
    { nombre: '🌱', id: 'btn-tierra' },
)
monster6.ataque.push(
    { nombre: '⚡', id: 'btn-trueno' },
    { nombre: '⚡', id: 'btn-trueno' },
    { nombre: '⚡', id: 'btn-trueno' },
    { nombre: '🌀', id: 'btn-viento' },
    { nombre: '💧', id: 'btn-agua' },
)
monster7.ataque.push(
    { nombre: '🌑', id: 'btn-noche' },
    { nombre: '🌑', id: 'btn-noche' },
    { nombre: '🌑', id: 'btn-noche' },
    { nombre: '🌀', id: 'btn-viento' },
    { nombre: '⛈️', id: 'btn-tormenta' },
)
// monster8.ataque.push(
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster9.ataque.push(
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
// )
// monster10.ataque.push(
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster11.ataque.push(
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
// )
// monster12.ataque.push(
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster13.ataque.push(
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
// )
// monster14.ataque.push(
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
// )
// monster15.ataque.push(
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster16.ataque.push(
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
// )
// monster17.ataque.push(
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster18.ataque.push(
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
// )
// monster19.ataque.push(
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster20.ataque.push(
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
// )
// monster21.ataque.push(
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
// )
// monster22.ataque.push(
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster23.ataque.push(
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '🌱', id: 'btn-tierra' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
// )
// monster24.ataque.push(
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster25.ataque.push(
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🔥', id: 'btn-fuego' },
// )
// monster26.ataque.push(
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
//     { nombre: '🌱', id: 'btn-tierra' },
// )
// monster27.ataque.push(
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
// )
// monster28.ataque.push(
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
// )
// monster29.ataque.push(
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '⚡', id: 'btn-trueno' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '💧', id: 'btn-agua' },
// )
// monster30.ataque.push(
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌑', id: 'btn-noche' },
//     { nombre: '🌀', id: 'btn-viento' },
//     { nombre: '⛈️', id: 'btn-tormenta' },
// )    

mokepones.push(monster1, monster2, monster3, monster4, monster5, monster6, monster7/*, monster8, monster9, monster10, monster11, monster12, monster13, monster14, monster15, monster16, monster17, monster18, monster19, monster20, monster21, monster22, monster23, monster24, monster25, monster26, monster27, monster28, monster29, monster30*/)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    mensaje.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionMapaCamvas.style.display = 'none'

    mokepones.forEach((Mokepon, index) => {
        opcionDeMokepones = `
        <label class="tarjeta-mascota" for="${Mokepon.nombre}">
        <p>${Mokepon.nombre}<span id="t-select-${index}"></span></p>
        <img src="${Mokepon.foto}" alt="${Mokepon.nombre}">
    </label>
    <input type="radio" name="mascota" id="${Mokepon.nombre}"/>
    
    `
        contenedorTarjetas.innerHTML += opcionDeMokepones
    })
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    seleccionarMascotaStyle.addEventListener('click', styleMascotaJugador)
    reiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch('http://localhost:8080/unirse')
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId=respuesta
                    })
            }
        })
}

function styleMascotaJugador() {

    const espacio = ' '

    mokepones.forEach((mokepon, index) => {

        const seleccionDeMokepon = document.getElementById(`t-select-${index}`)
        const input = document.getElementById(mokepon.nombre)

        if (input.checked) {
            seleccionDeMokepon.innerHTML = espacio + 'Selected'
        } else {
            seleccionDeMokepon.innerHTML = ''
        }
    })
}

function seleccionarMascotaJugador() {

    spanMascotaJugador = document.getElementById('mascota-jugador')
    spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    let modoJuego1 = document.getElementById('modo-1')
    let modoJuego2 = document.getElementById('modo-2')

    if (modoJuego1.checked) {
        modoJuegoPorMuerte = 1
    } else if (modoJuego2.checked) {
        modoJuegoPorVictorias = 1
    } else if (!modoJuego1.checked && !modoJuego2.checked) {
        Swal.fire(
            'Selecciona un Modo de Juego',
            '',
            'error'
        );
        return
    }

    mokeponSeleccionado = mokepones.find((mokepon) => {
        const input = document.getElementById(mokepon.nombre)
        return input.checked
    })

    seleccionarMascotaEnemigo()

    if (mokeponSeleccionado) {
        spanMascotaJugador.innerHTML = mokeponSeleccionado.nombre
        spanMascotaEnemigo.innerHTML = moustruoEnemigoSeleccionado.nombre
        titulo.style.display = 'none'
        // sectionSeleccionarAtaque.style.display = 'flex'
        sectionMapaCamvas.style.display = 'flex'
        iniciarMapa()

        sectionSeleccionarMascota.style.display = 'none'
        moustruoSeleccionado = mokeponSeleccionado.nombre
    } else {
        Swal.fire(
            'Selecciona una Mascota',
            'Sin Mascota no Puedes Jugar',
            'error'
        )
    }

    seleccionarMokepon(moustruoSeleccionado)
    seleccionarAtaqueJugador(moustruoSeleccionado)
}

function seleccionarMokepon(moustruoSeleccionado) {

    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: moustruoSeleccionado
        })
    })

}

function seleccionarAtaqueJugador(moustruoSeleccionado) {

    let ataques

    for (let i = 0; i < mokepones.length; i++) {

        if (moustruoSeleccionado === mokepones[i].nombre) {
            ataques = mokepones[i].ataque
        }
    }

    ataques.forEach((ataques) => {
        opcionDeAtaques = `<button class="ataque btn-ataques" id="${ataques.id}">${ataques.nombre}</button>`
        contenedorAtaques.innerHTML += opcionDeAtaques
    })
    botonesAtaque = document.querySelectorAll('.btn-ataques')
    // console.log(botonesAtaque)
    modularAtaques()
}

function modularAtaques() {

    botonesAtaque.forEach((botones) => {
        botones.addEventListener('click', (e) => {
            if (e.target.textContent == '🔥') {
                ataquesDelJugador.push('Fuego')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "🔥"

            } else if (e.target.textContent == '💧') {
                ataquesDelJugador.push('Agua')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "💧"

            } else if (e.target.textContent == '🌱') {
                ataquesDelJugador.push('Tierra')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "🌱"

            } else if (e.target.textContent == '⛈️') {
                ataquesDelJugador.push('Tierra')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "⛈️"

            } else if (e.target.textContent == '🌀') {
                ataquesDelJugador.push('Tierra')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "🌀"

            } else if (e.target.textContent == '⚡') {
                ataquesDelJugador.push('Tierra')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "⚡"

            } else if (e.target.textContent == '🌑') {
                ataquesDelJugador.push('Tierra')
                // console.log(ataquesDelJugador)

                if (modoJuegoPorVictorias == 1) {
                    botones.style.background = '#2D2524'
                    botones.disabled = true;
                }
                ataqueJugador = "🌑"

            }
            ataqueEnemigo = seleccionarAtaqueEnemigo().nombre
            combate()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, mokepones.length) - 1
    moustruoEnemigoSeleccionado = mokepones[mascotaAleatoria]
}

function seleccionarAtaqueEnemigo() {
    let ataqueAleatorio = aleatorio(1, moustruoEnemigoSeleccionado.ataque.length) - 1
    ataqueEnemigoSeleccionado = moustruoEnemigoSeleccionado.ataque[ataqueAleatorio]

    if (ataqueEnemigoSeleccionado.nombre == '🔥') {
        ataquesDelEnemigo.push('Fuego')
    } else if (ataqueEnemigoSeleccionado.nombre == '💧') {
        ataquesDelEnemigo.push('Agua')
    } else if (ataqueEnemigoSeleccionado.nombre == '🌱') {
        ataquesDelEnemigo.push('Tierra')
    } else if (ataqueEnemigoSeleccionado.nombre == '⛈️') {
        ataquesDelEnemigo.push('Tormenta')
    } else if (ataqueEnemigoSeleccionado.nombre == '🌀') {
        ataquesDelEnemigo.push('Viento')
    } else if (ataqueEnemigoSeleccionado.nombre == '⚡') {
        ataquesDelEnemigo.push('Trueno')
    } else if (ataqueEnemigoSeleccionado.nombre == '🌑') {
        ataquesDelEnemigo.push('Noche')
    }
    // console.log(ataquesDelEnemigo)

    return ataqueEnemigoSeleccionado
}

function combate() {
    let vida = '❤️'

    if (modoJuegoPorMuerte == 1) {

        mensaje.style.display = 'flex'

        if (ataqueJugador == '🔥' && ataqueEnemigo == '🌱' || ataqueJugador == '🔥' && ataqueEnemigo == '🌀' ||
            ataqueJugador == '💧' && ataqueEnemigo == '🔥' || ataqueJugador == '💧' && ataqueEnemigo == '🌱' ||
            ataqueJugador == '💧' && ataqueEnemigo == '⛈️' || ataqueJugador == '🌱' && ataqueEnemigo == '🔥' ||
            ataqueJugador == '🌱' && ataqueEnemigo == '⚡' || ataqueJugador == '⛈️' && ataqueEnemigo == '💧' ||
            ataqueJugador == '⛈️' && ataqueEnemigo == '🌀' || ataqueJugador == '⛈️' && ataqueEnemigo == '🌱' ||
            ataqueJugador == '🌀' && ataqueEnemigo == '🔥' || ataqueJugador == '🌀' && ataqueEnemigo == '🌱 ' ||
            ataqueJugador == '🌀' && ataqueEnemigo == '⚡' || ataqueJugador == '⚡' && ataqueEnemigo == '💧' ||
            ataqueJugador == '⚡' && ataqueEnemigo == '🌀' || ataqueJugador == '🌑' && ataqueEnemigo == '🔥' ||
            ataqueJugador == '🌑' && ataqueEnemigo == '💧' || ataqueJugador == '🌑' && ataqueEnemigo == '🌱' ||
            ataqueJugador == '🌑' && ataqueEnemigo == '⛈️' || ataqueJugador == '🌑' && ataqueEnemigo == '🌀' ||
            ataqueJugador == '🌑' && ataqueEnemigo == '⚡') {
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
            sectionReiniciar.style.display = 'flex'
            botonesAtaque.forEach((boton) => {
                boton.style.background = '#2D2524'
                boton.disabled = true;
            });

        } else if (vidasEnemigo == 0) {
            Swal.fire(
                '¡Buen Trabajo!',
                'Tu Mascota Gano la Batalla',
                'success'
            )
            spanVidasEnemigo.innerHTML = '☠️'
            sectionReiniciar.style.display = 'flex'
            botonesAtaque.forEach((boton) => {
                boton.style.background = '#2D2524'
                boton.disabled = true;
            });
        }

    }

    if (modoJuegoPorVictorias == 1) {

        mensaje.style.display = 'flex'

        if (ataqueJugador == '🔥' && ataqueEnemigo == '🌱' || ataqueJugador == '🔥' && ataqueEnemigo == '🌀' ||
            ataqueJugador == '💧' && ataqueEnemigo == '🔥' || ataqueJugador == '💧' && ataqueEnemigo == '🌱' ||
            ataqueJugador == '💧' && ataqueEnemigo == '⛈️' || ataqueJugador == '🌱' && ataqueEnemigo == '🔥' ||
            ataqueJugador == '🌱' && ataqueEnemigo == '⚡' || ataqueJugador == '⛈️' && ataqueEnemigo == '💧' ||
            ataqueJugador == '⛈️' && ataqueEnemigo == '🌀' || ataqueJugador == '⛈️' && ataqueEnemigo == '🌱' ||
            ataqueJugador == '🌀' && ataqueEnemigo == '🔥' || ataqueJugador == '🌀' && ataqueEnemigo == '🌱 ' ||
            ataqueJugador == '🌀' && ataqueEnemigo == '⚡' || ataqueJugador == '⚡' && ataqueEnemigo == '💧' ||
            ataqueJugador == '⚡' && ataqueEnemigo == '🌀' || ataqueJugador == '🌑' && ataqueEnemigo == '🔥' ||
            ataqueJugador == '🌑' && ataqueEnemigo == '💧' || ataqueJugador == '🌑' && ataqueEnemigo == '🌱' ||
            ataqueJugador == '🌑' && ataqueEnemigo == '⛈️' || ataqueJugador == '🌑' && ataqueEnemigo == '🌀' ||
            ataqueJugador == '🌑' && ataqueEnemigo == '⚡') {
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

        if (ataquesDelJugador.length == 5 || vidasJugador == 0 || vidasEnemigo == 0) {
            if (vidasJugador == 0) {
                Swal.fire(
                    '¡La Batalla Estuvo Dificil!',
                    'Tu Mascota Perdio la Batalla',
                    'error'
                )
                spanVidasJugador.innerHTML = '☠️'
                sectionReiniciar.style.display = 'flex'
                botonesAtaque.forEach((boton) => {
                    boton.disabled = true;
                });

            } else if (vidasEnemigo == 0) {
                Swal.fire(
                    '¡Buen Trabajo!',
                    'Tu Mascota Gano la Batalla',
                    'success'
                )
                spanVidasEnemigo.innerHTML = '☠️'
                sectionReiniciar.style.display = 'flex'
                botonesAtaque.forEach((boton) => {
                    boton.disabled = true;
                });

            } else if (vidasJugador < vidasEnemigo) {
                Swal.fire(
                    '¡La Batalla Estuvo Dificil!',
                    'Tu Mascota Perdio la Batalla',
                    'error'
                )
                sectionReiniciar.style.display = 'flex'
                botonesAtaque.forEach((boton) => {
                    boton.disabled = true;
                });

            } else if (vidasJugador > vidasEnemigo) {
                Swal.fire(
                    '¡Buen Trabajo!',
                    'Tu Mascota Gano la Batalla',
                    'success'
                )
                sectionReiniciar.style.display = 'flex'
                botonesAtaque.forEach((boton) => {
                    boton.disabled = true;
                });

            } else if (vidasJugador = vidasEnemigo) {
                Swal.fire(
                    '¡Gran Batalla!',
                    'Tu Mascota Obtuvo un Empate',
                    'success'
                )
                sectionReiniciar.style.display = 'flex'
                botonesAtaque.forEach((boton) => {
                    boton.disabled = true;
                });
            }

        }

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

function pintarCanvas() {

    mokeponSeleccionado.x = mokeponSeleccionado.x + mokeponSeleccionado.velocidadX
    mokeponSeleccionado.y = mokeponSeleccionado.y + mokeponSeleccionado.velocidadY

    moustruoEnemigoSeleccionado.x = 230
    moustruoEnemigoSeleccionado.y = 100

    // console.log(mokeponSeleccionado.x + "||||" + mokeponSeleccionado.y)

    lienzo.clearRect(0, 0, mapaCanvas.width, mapaCanvas.height)
    lienzo.drawImage(
        mapabackground, 0, 0, mapaCanvas.width, mapaCanvas.height
    )
    mokeponSeleccionado.pintarMokepon()

    if (moustruoEnemigoSeleccionado.nombre == mokeponSeleccionado) {
        seleccionarMascotaEnemigo()
        moustruoEnemigoSeleccionado.pintarMokepon()
    }
    else (
        moustruoEnemigoSeleccionado.pintarMokepon()
    )

    if (mokeponSeleccionado.velocidadX !== 0 || mokeponSeleccionado.velocidadY !== 0) {
        colision(moustruoEnemigoSeleccionado)
    }
}

function moverMonsterAr() {
    mokeponSeleccionado.velocidadY = -2
}
function moverMonsterI() {
    mokeponSeleccionado.velocidadX = -2
}
function moverMonsterAb() {
    mokeponSeleccionado.velocidadY = 2
}
function moverMonsterD() {
    mokeponSeleccionado.velocidadX = 2
}

function detenerMovimiento() {
    mokeponSeleccionado.velocidadX = 0
    mokeponSeleccionado.velocidadY = 0
}

function movientoTeclas(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverMonsterAr()
            break;
        case 'ArrowDown':
            moverMonsterAb()
            break;
        case 'ArrowRight':
            moverMonsterD()
            break;
        case 'ArrowLeft':
            moverMonsterI()
            break;
        default:
            break;
    }
}

function colision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mokeponSeleccionado.y
    const abajoMascota = mokeponSeleccionado.y + mokeponSeleccionado.alto
    const derechaMascota = mokeponSeleccionado.x + mokeponSeleccionado.ancho
    const izquierdaMascota = mokeponSeleccionado.x

    if (
        abajoMascota + 50 < arribaEnemigo ||
        arribaMascota + 50 > abajoEnemigo ||
        derechaMascota + 50 < izquierdaEnemigo ||
        izquierdaMascota + 50 > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()

    titulo.style.display = 'flex'
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionMapaCamvas.style.display = 'none'

}

function iniciarMapa() {

    mapaCanvas.width = 563
    mapaCanvas.height = 354

    // Evento

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', movientoTeclas)
    window.addEventListener('keyup', detenerMovimiento)

}

window.addEventListener('load', iniciarJuego)
