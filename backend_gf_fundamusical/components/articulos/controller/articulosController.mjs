import { modelDB } from '../model/articulosModel.mjs'

export class controller {
  static getAll (req, res) {
    // const { genre } = req.query esta es para filtrar por genero pero quiero que me todas las peliculas primero para testear
    const movies = modelDB.getAll() // ({ genre }) esto es parte del filtro por genero
    return res.json(movies).status(200)
  }

  static getById (req, res) {
    const { id } = req.params
    const movies = modelDB.getById(id)
    if (!movies) {
      return res.status(404).json({ error: 'Movie not found' })
    }
    return res.json(movies).status(200)
  }
}
