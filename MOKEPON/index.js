const libreriaExpress = require('express')
const app = libreriaExpress()

const jugadores = []

class Jugador {
    constructor(idJugadores) {
        this.idJugadores = idJugadores
    }
}

app.get("/unirse", (req, res) => {

    const idJugadores = `${Date.now()}-${Math.random()}`
    const jugador = new Jugador(idJugadores)

    jugadores.push(`¡Jugador con ID ${idJugadores} se ha unido correctamente!`)

    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(idJugadores)

})

app.listen(8080, (err) => {

    if (err) {
        console.error('El Error es: ' + err)
    } else {
        console.log('Servidor Funcionando')
    }
})