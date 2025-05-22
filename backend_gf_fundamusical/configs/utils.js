// importacion de la "base de datos""
// Importo la base de datos desde el archivo example.json, y le digo que es un json para que no me tire error de tipo
// No se puede importar un json directamente, por eso lo importo con createRequire para usar commonjs dentro de un archivo mjs
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

// Exporto la base de datos para poder usarla en otros archivos
