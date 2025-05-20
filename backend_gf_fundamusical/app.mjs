// Este es el archivo principal de la aplicacion, donde se inicializa el servidor y se configuran las rutas y middlewares, adenas de llamar a la base de datos.

import { app, PORT } from './configs/server.mjs' // Importo el servidor y el puerto desde el archivo server.mjs

// Pendiente para coninuar, no se que porongas se hace aqui, pero bueno, voy a ver de que se trata todo desde el node antes de usar el framework.
// Dependencias de produccion y dependencia de desarrollo.
// Dependencias de produccion son las que se necesitan para que la aplicacion funcione, y las de desarrollo son las que se necesitan para desarrollar la aplicacion.
// las dependencias de desarrollo se instalan con el flag -D o --save-dev
// las dependencias de produccion se instalan con el flag -P o --save-prod

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})
