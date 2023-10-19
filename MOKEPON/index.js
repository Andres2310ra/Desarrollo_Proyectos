const libreriaExpress = require('express')
const app = libreriaExpress()

const jugadores = []

class Jugador {
    constructor(idJugadores) {
        this.idJugadores = idJugadores
    }
} 

app.get("/unirse", (reqs, resp) => {

    const idJugadores = `${Date.now()}-${Math.random()}`
    const jugador = new Jugador(idJugadores)

    jugadores.push(`¡Jugador con ID ${idJugadores} se ha unido correctamente!`)

    resp.send(idJugadores)
})

app.listen(8080, (err) => {

        if (err) {
            console.error('El Error es: ' + err)
        } else{
            console.log('Servidor Funcionando')
        }

})