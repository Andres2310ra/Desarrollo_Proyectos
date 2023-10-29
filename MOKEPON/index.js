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

    console.log(jugadores)
    console.log(jugadorId)

    res.end()
})

app.listen(8080, (err) => {

    if (err) {
        console.error('El Error es: ' + err)
    } else {
        console.log('Servidor Funcionando')
    }
})