import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const readJSON = (path) => require(path)

// import { readJSON } from '../../utils.mjs' // importacion de UTILS para leer el json
export const connection = readJSON('../localdb/example.json') // importo la base de datos desde el archivo example.json con la funcion readJSON.
