/* NODE JS SERVER CREATION

import http from 'http'

const PORT = 3128 // Puerto en el que se va a escuchar el servidor, si es 0 se elige uno aleatorio

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8') // El header Content-Type indica que el contenido es texto plano y que se usará la codificación UTF-8

  if (req.url === '/') {
    console.log('Request received:')
    res.end('este es el sin nada')
  } else if (req.url === '/segundotry') {
    console.log('Request received:')
    res.end('este es el segundo')
  } else {
    res.statusCode = 404 // Not Found
    console.log('Request received:')
    res.end('not found')
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${server.address().port}`)
})

// 100-199 Respuestas informativas
// 200-299 Respuestas satisfactorias                                   (200 OK)
// 300-399 Redirecciones                                               (301 Moved Permanently)
// 400-499 Errores del cliente, errores por culpa del cliente          (400 Bad Request) (404 Not Found)
// 500-599 Errores del servidor, errores por culpa del servidor        (500 Internal Server Error) */

import express from 'express'
const app = express()

const PORT = process.env.PORT || 3128

app.get('/', (req, res) => {
  res.send('Hello World!').status(200) // Express automáticamente establece el Content-Type
})

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})

// MIDDLEWARES
// Son funciones que se ejecutan antes de las rutas, se pueden usar para autenticar, validar, etc.
// Un middleware es una función que recibe tres parámetros: req, res y next.

// Midudev de ejemplo lo que hizo con el middleware fue hacer una funsion solo para peticiones POST mediante req.method =/= 'POST' return next()
// tambien valido que content-type fuera application/json, sino return next()
// y si no cumplian las condiciones entraba a la funcion middleware para parsear el body de la peticion POST, y lo guardo en req.body (esto se conoce como mutacion de request y guardarlo en el boddy)
// al final a la peticion app.post le paso el middleware req.body para mostrarlo en la pagina.
// app.post('/pokemon' , (req, res) => { res.status(200).json(red.body) })

// CHISTE DEL DIA, Todo lo anterior se puede hacer con express.json() y express.urlencoded() (que es el que se usa para los formularios) y no hace falta hacer un middleware, pero bueno, es un ejemplo de como se hace.

// Esta linea de codigo es para que si no se encuentra la ruta, se devuelva un error 404. Siempre se coloca de ultimo.
app.use((req, res) => {
  res.status(404).send('Not Found | Error 404')
})
