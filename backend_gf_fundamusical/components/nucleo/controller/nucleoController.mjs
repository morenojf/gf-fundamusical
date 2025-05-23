import { nucleoModel } from '../model/nucleoModel.mjs'

export class nucleoController {
// Obtiene todos los nucleos de la base de datos, idealmente para la vista de administrador
  static getAll (req, res) {
    // const { genre } = req.query esta es para filtrar por genero pero quiero que me todas las peliculas primero para testear
    const nucleos = nucleoModel.getAll() // ({ genre }) esto es parte del filtro por genero
    if (!nucleos) {
      return res.status(404).json({ error: 'No se encontraron articulos' })
    } else {
      return res.json(nucleos).status(200)
    }
  }

  // Idealmente se obtiene nombre de nucleo, director y coordinador mediante el id del nuecleo
  static getPartial (req, res) {
    const partialInfo = req.body // Gracias a la libreria express-validator, el body ya viene en formato json {nombre, cantidad} = articulosACrear
    const nucleoInfo = nucleoModel.createArticulo(partialInfo) // esto retorna el parametro result de la arrow function desde el modelo
    if (!nucleoInfo) {
      return res.status(500).json({ error: 'DataBase error' })
    }
    return res.json(nucleoInfo).status(200)
  }
}
