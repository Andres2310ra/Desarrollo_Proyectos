const libreriaExpress = require('express')
const app = libreriaExpress()

const jugadores = []

class jugador {
    constructor(idJugadores) {
        this.idJugadores = idJugadores
    }
}

app.get("/unirse", (reqs, resp) => {

    const idJugadores = `${Math.round()}`
    const jugador = new jugador(idJugadores)

    jugadores.push(jugador)

    resp.send(idJugadores)
})

app.listen(8080, () => {
    console.log('Servidor Funcionando')
})