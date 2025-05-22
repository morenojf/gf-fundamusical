import { createRequire } from 'node:module'
const required = createRequire(import.meta.url)

export const readJSON = (path) => required(path)

// import { readJSON } from '../../utils.mjs' // importacion de funcion para leer el json como DB local
const moviesLocalDB = readJSON('../localdb/example.json') // importo la base de datos desde el archivo example.json con la funcion readJSON.

export class modelLocalDB {
  static getAll () {
    const movies = moviesLocalDB
    return movies
  }
}

// la funcion getAll devuelve todas las peliculas de la base de datos local
