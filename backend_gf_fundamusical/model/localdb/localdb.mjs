import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

// import { readJSON } from '../../utils.mjs' // importacion de funcion para leer el json como DB local
const moviesDB = readJSON('../localdb/example.json') // importo la base de datos desde el archivo example.json con la funcion readJSON.

export class modelDB {
  static getAll () {
    const movies = moviesDB
    return movies
  }

  static getById (id) {
    const movies = moviesDB
    const movie = movies.find((movie) => movie.imdbID === id)
    return movie
  }
}

// la funcion getAll devuelve todas las peliculas de la base de datos local

// IMPORTANTE: Idealmente la calse se llama ModelDB para que sea mas generico y poder usarla importandola pero cambiando el src y no el nombre de las llamadas de funcion
