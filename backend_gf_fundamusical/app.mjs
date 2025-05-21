// Este es el archivo principal de la aplicacion, donde se inicializa el servidor y se configuran las rutas y middlewares, adenas de llamar a la base de datos.

import { app, PORT } from './configs/server.mjs' // Importo el servidor y el puerto desde el archivo server.mjs
import { routing } from './configs/routing.mjs' // Importo las rutas desde el archivo routes.mjs

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})

app.use('/gf_fundamusical', routing)
