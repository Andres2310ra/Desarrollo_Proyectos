const libreriaExpress = require('express')
const app = libreriaExpress()

app.get("/", (reqs, resp) => {
    resp.send('Hola el Servidor esta en Funcionamiento')
})

app.listen(8080, () => {
    console.log('Servidor Funcionando')
})