// Este archivo levanta el servidor y configura los middlewares.

import express from 'express'

// importacion de la "base de datos""
// Importo la base de datos desde el archivo example.json, y le digo que es un json para que no me tire error de tipo
// No se puede importar un json directamente, por eso lo importo con createRequire para usar commonjs dentro de un archivo mjs
import { createRequire } from 'module'
const required = createRequire(import.meta.url)
const movies = required('../common/example.json')
const app = express()

const PORT = process.env.PORT || 3128

app.get('/', (req, res) => {
  res.send('<h1>Esta es la pagina principal</h1>').status(200) // Express automáticamente establece el Content-Type
})

// Esto se le conoce como endpoint, es una ruta que se le asigna un recurso
// En este caso, la ruta es /lepiculas y el recurso es la base de datos de peliculas
app.get('/lepiculas', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.Genre.includes(genre))
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Esta ruta es para obtener una pelicula en particular, se le pasa el id por la url
app.get('/lepiculas/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.imdbID === id)
  if (movie) return res.json(movie.Title) // Express automáticamente establece el Content-Type

  res.status(404).send('Not Found | Error 404') // Si no se encuentra la pelicula, se devuelve un error 404
})

// Esta linea de codigo es para que si no se encuentra la ruta, se devuelva un error 404. Siempre se coloca de ultimo.
app.use((req, res) => {
  res.status(404).send('Not Found | Error 404')
})

export { app, PORT } // Exporto el servidor y el puerto para poder usarlos en otros archivos

// 100-199 Respuestas informativas
// 200-299 Respuestas satisfactorias                                   (200 OK)
// 300-399 Redirecciones                                               (301 Moved Permanently)
// 400-499 Errores del cliente, errores por culpa del cliente          (400 Bad Request) (404 Not Found)
// 500-599 Errores del servidor, errores por culpa del servidor        (500 Internal Server Error) */

// MIDDLEWARES
// Son funciones que se ejecutan antes de las rutas, se pueden usar para autenticar, validar, etc.
// Un middleware es una función que recibe tres parámetros: req, res y next.

// Midudev de ejemplo lo que hizo con el middleware fue hacer una funcion solo para peticiones POST mediante req.method =/= 'POST' return next()
// tambien valido que content-type fuera application/json, sino return next()
// y si no cumplian las condiciones entraba a la funcion middleware para parsear el body de la peticion POST, y lo guardo en req.body (esto se conoce como mutacion de request y guardarlo en el boddy)
// al final a la peticion app.post le paso el middleware req.body para mostrarlo en la pagina.
// app.post('/pokemon' , (req, res) => { res.status(200).json(red.body) })

// CHISTE DEL DIA, Todo lo anterior se puede hacer con express.json() y express.urlencoded() (que es el que se usa para los formularios) y no hace falta hacer un middleware, pero bueno, es un ejemplo de como se hace.
