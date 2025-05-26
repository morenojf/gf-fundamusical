import { articlesModel } from '../model/articulosModel.mjs'

export class articleController {
  static async getAll (req, res) {
    const articulos = await articlesModel.getAll()
    if (!articulos) {
      return res.status(404).json({ error: 'No se encontraron articulos' })
    } else {
      console.log('Articulos encontrados:', articulos)
      return res.status(200).json(articulos)
    }
  }

//   static createArticulo (req, res) {
//     const articulosACrear = req.body // Gracias a la libreria express-validator, el body ya viene en formato json {nombre, cantidad} = articulosACrear
//     const createdArticle = articlesModel.createArticulo(articulosACrear) // esto retorna el parametro result de la arrow function desde el modelo
//     if (!createdArticle) {
//       return res.status(404).json({ error: 'Missing Articles' })
//     }
//     return res.json(createdArticle).status(200)
//   }
}
