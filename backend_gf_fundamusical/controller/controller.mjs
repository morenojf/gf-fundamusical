// este archivo recibira la ruta y seleccionara el modelo correspondiente.
// en caso de fallo, lanza el error res.srtatus(httpStatus)
// En caso de succeso, devuelve el resultado.
import express, { json } from 'express'
import { modelLocalDB } from '../model/localdb/fs.mjs' // Base de datos local

const app = express()
app.use(json()) // Middleware para parsear el body de la peticion a json

// import { modelMySLQ } from '../model/mysql-db/dbfundamusical.mjs' BASE DE DATOS MYSQL

export class controller {
  static getAll (req, res) {
    // const { genre } = req.query esta es para filtrar por genero pero quiero que me todas las peliculas primero para testear
    const movies = modelLocalDB.getAll() // ({ genre }) esto es parte del filtro por genero
    // res.json(movies).status(200)
    return console.log(movies)
  }
}
