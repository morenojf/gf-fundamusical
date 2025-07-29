// Este archivo levanta el servidor y configura los middlewares.
import express, { json } from 'express'
import process from 'process'
const SECRET_JWT_KEY = 'this-is-my-jwt-secret-keyword'
const app = express()
app.use(json()) // Middleware para parsear el body de la peticion a json
const PORT = process.env.PORT || 3128

export { app, PORT, SECRET_JWT_KEY } // Exporto el servidor y el puerto para poder usarlos en otros archivos

// 100-199 Respuestas informativas
// 200-299 Respuestas satisfactorias                                   (200 OK)
// 300-399 Redirecciones                                               (301 Moved Permanently)
// 400-499 Errores del cliente, errores por culpa del cliente          (400 Bad Request) (404 Not Found)
// 500-599 Errores del servidor, errores por culpa del servidor        (500 Internal Server Error) */