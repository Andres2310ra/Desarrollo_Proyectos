const libreriaExpress = require('express')
const libreriaCors=require('cors')
const app = libreriaExpress()

app.use(libreriaCors())
app.use(libreriaExpress.json())

const jugadores = []

class Jugador {
    constructor(idJugadores) {
        this.idJugadores = idJugadores
    }
}

app.get("/unirse", (req, res) => {

    const idJugadores = `${Date.now()}-${Math.random()}`
    const jugador = new Jugador(idJugadores)

    jugadores.push(`¡Jugador con ID ${jugador} se ha unido correctamente!`)

    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(idJugadores)

})

app.post("/mokepon/:jugadorId",(req,res=>{
    const jugadorId=req.params.jugadorId || ""

    console.log(jugadores)
    console.log(jugadorId)

    res.end()
}))

app.listen(8080, (err) => {

    if (err) {
        console.error('El Error es: ' + err)
    } else {
        console.log('Servidor Funcionando')
    }
})