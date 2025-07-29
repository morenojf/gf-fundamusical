import { nucleoModel } from '../model/nucleoModel.mjs'

export class nucleoController {
// Obtiene todos los nucleos de la base de datos, idealmente para la vista de administrador
  static async getAll (req, res) {
	try {
		const nucleos = await nucleoModel.getAll()
		res.status(200).send(nucleos)
	} catch (error) {
		res.send(error)
	}
  }

// Obtiene informacion de un solo nucleo según el id del usuario
static async getNucleoByUserId (req, res){
	try {
		const userId = req.params.id
		const nucleoInfo = await nucleoModel.getNucleoByUserId(userId)
		res.status(200).send(nucleoInfo)
	} catch (error) {
		res.status(200).send(error)
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
