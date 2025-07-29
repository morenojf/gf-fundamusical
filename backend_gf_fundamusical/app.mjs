// Este es el archivo principal de la aplicacion, donde se inicializa el servidor y se configuran las rutas y middlewares, adenas de llamar a la base de datos.
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { app, PORT } from './configs/server.mjs' // Importo el servidor y el puerto desde el archivo server.mjs
import { routing } from './configs/routing.mjs' // Importo las rutas desde el archivo routes.mjs

// import { corsMiddleware } from './middlewares/middlewares.mjs'

// app.use(corsMiddleware) // Uso el middleware de cors para permitir el acceso a la API desde cualquier origen

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})

// parsear los req.body que vienen en json para que nodejs los pueda utilizar
app.use(express.json());

//cookieParser para guardar cosas, como por ejemplo el jwt en cookies del navegador.
app.use(cookieParser())


// Esto permite quitar el cors issue para todas las peticiones bien sean get o put patch delete post
// Para configs avanzadas de cors
app.use(cors({
  origin: 'http://localhost:4200', // Solo permite tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
// Para configuraciones simples y origin *
// app.use(cors())

// Esto permite acceder a los archivos guardados dentro de la carpeta public mediante el endpoint de la api 
// http://localhost:${PORT}/nombreArchivo.extension
app.use(express.static('./public/supports'))
app.use(express.static('./public/modelosCartas'))


// Esto dirige al archivo de rutas cualquier peticion que se haga a /api
app.use('/api', routing)