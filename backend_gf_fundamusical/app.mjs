// Este es el archivo principal de la aplicacion, donde se inicializa el servidor y se configuran las rutas y middlewares, adenas de llamar a la base de datos.

import { app, PORT } from './configs/server.mjs' // Importo el servidor y el puerto desde el archivo server.mjs
import { routing } from './configs/routing.mjs' // Importo las rutas desde el archivo routes.mjs
// import { corsMiddleware } from './middlewares/middlewares.mjs'

// app.use(corsMiddleware) // Uso el middleware de cors para permitir el acceso a la API desde cualquier origen

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})

app.use('/movies', routing)
