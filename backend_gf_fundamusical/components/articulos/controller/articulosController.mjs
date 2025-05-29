import { solicitudModel } from '../../solicitudes/model/solicitudModel.mjs'
import { articulosModel } from '../model/articulosModel.mjs'
import { periodoModel } from '../../periodos/model/periodoModel.mjs'


export class articulosController {

	// ESTA FUNCION CREA LOS ARTICULOS Y LOS RELACIONA CON LAS SOLICITUDES

	static async addToSolicitud (req, res) {
		const solicitudId = req.params.id // CONTIENE ID DE SOLICITUD DADA POR PARAMETRO
		const articleData = req.body // {ARTICULO NAME: '', CANTIDAD: INT}
		const userId = 1

		try {
		const createdArticles = await articulosModel.createArticle(articleData)
		// return [{ID: createdArticleId, nombre: articuloName}]
		// OK

		const insertedArticles = await articulosModel.insertArticles(solicitudId, createdArticles, articleData) 
		// return [{solcitudArticuloID: INT, articuloName: '', articuloQuantity: INT}]


		// EJECUTA LA FUNCION DE OBTENER SOLICITUDES SEGUN PERIODO PARA ACTUALIZAR LAS SOLICITUDES CON SUS RESPECTIVOS ARTICULOS

		res.status(200).json(insertedArticles)

		} catch (error) {
		res.status(500).json({message: error})
		}
		
	}
}