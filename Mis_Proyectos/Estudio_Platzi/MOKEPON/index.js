const libreriaExpress = require('express')
const libreriaCors = require('cors')
const app = libreriaExpress()

app.use(libreriaCors())
app.use(libreriaExpress.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {

    const id = `${Date.now()}-${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(id)

})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)

    res.end()
})

app.post("/mokepon/:jugador/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    // console.log(x + "||" + y)

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.listen(8080, (err) => {

    if (err) {
        console.error('El Error es: ' + err)
    } else {
        console.log('Servidor Funcionando')
    }
})