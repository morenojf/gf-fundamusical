import { nucleoModel } from '../model/nucleoModel.mjs'

export class nucleoController {
  // Obtiene todos los nucleos de la base de datos, idealmente para la vista de administrador
  static async getAll(req, res) {
    try {
      const nucleos = await nucleoModel.getAll()
      res.status(200).send(nucleos)
    } catch (error) {
      res.send(error)
    }
  }

  // Obtiene informacion de un solo nucleo según el id del usuario
  static async getNucleoByUserId(req, res) {
    try {
      const userId = req.params.id
      const nucleoInfo = await nucleoModel.getNucleoByUserId(userId)
      res.status(200).send(nucleoInfo)
    } catch (error) {
      res.status(200).send(error)
    }
  }

  // Crear un solo nucleo con su nombre
  static async createNucleo(req, res) {
    try {
      const nucleoCreate = await nucleoModel.createNucleo(req.body)
      res.status(200).send(nucleoCreate)
    } catch (error) {
      res.send(error)
    }
  }

  // Actualizar la información del nucleo
  static async updateNucleo(req, res) {
    try {
      const updatedNucleo = await nucleoModel.updateNucleo(req.body)
      res.status(200).send(updatedNucleo)
    } catch (error) {
		res.status(400).send(error)
	}
  }




  // Obtener la tabla usuario_Nucleo para poder saber que nucleos ya tienen un usuario asignado 
  static async getNucleoUsuario(req, res){
	try {
		const nucleoUsuarios = await nucleoModel.getNucleoUsuario()
		res.status(200).send(nucleoUsuarios)
	} catch (error) {
		res.send(error)
	}
  }
}
