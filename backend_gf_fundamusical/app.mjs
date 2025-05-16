import express from 'express'
import pc from 'picocolors'
const app = express()
console.log(process.cwd())
const PORT = process.env.PORT || 3000

console.log(app)
console.log(PORT,
  pc.red(`How are ${pc.italic('you')} doing?`)
)

// Pendiente para coninuar, no se que porongas se hace aqui, pero bueno, voy a ver de que se trata todo desde el node antes de usar el framework.
// Dependencias de produccion y dependencia de desarrollo.
// Dependencias de produccion son las que se necesitan para que la aplicacion funcione, y las de desarrollo son las que se necesitan para desarrollar la aplicacion.
// las dependencias de desarrollo se instalan con el flag -D o --save-dev
// las dependencias de produccion se instalan con el flag -P o --save-prod

console.log(pc.red('Hola mundo'))
