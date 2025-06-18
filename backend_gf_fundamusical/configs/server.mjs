// Este archivo levanta el servidor y configura los middlewares.
import express, { json } from 'express'
import process from 'process'
const app = express()
app.use(json()) // Middleware para parsear el body de la peticion a json
const PORT = process.env.PORT || 3128

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
