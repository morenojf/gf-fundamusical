import { articlesModel } from '../model/articulosModel.mjs'

export class articleController {
  static getAll (req, res) {
    // const { genre } = req.query esta es para filtrar por genero pero quiero que me todas las peliculas primero para testear
    const articulos = articlesModel.getAll() // ({ genre }) esto es parte del filtro por genero
    if (!articulos) {
      return res.status(404).json({ error: 'No se encontraron articulos' })
    } else {
      return res.json(articulos).status(200)
    }
  }

  static createArticulo (req, res) {
    const articulosACrear = req.body // Gracias a la libreria express-validator, el body ya viene en formato json {nombre, cantidad} = articulosACrear
    const createdArticle = articlesModel.createArticulo(articulosACrear) // esto retorna el parametro result de la arrow function desde el modelo
    if (!createdArticle) {
      return res.status(404).json({ error: 'Missing Articles' })
    }
    return res.json(createdArticle).status(200)
  }
}
