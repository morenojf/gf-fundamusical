// 1. OBTENER TODOS LOS PLANES DE CUENTA PARA MOSTRARLOS EN EL DROP DOWN SELECT
// 2. DROP DOWN 2 DINAMICO EL FRONT LE ENVIA EL ID AL BACK DEL PLAN DE CUENTA SELECCIONADO POR URL /gestion/modal/plancuenta-subcategoria/:id PETICION HECHA DENTRO DEL MODAL
// 3. EL BACKEND FILTRA LA INFORMACIÓN Y REGRESA LAS SUBCATEGORIAS RELACIONADAS
// import { periodoModel } from '../../periodos/model/periodoModel.mjs'
import { partidasModel } from '../model/partidasModel.mjs'

export class partidasController {

	static async getAllPartidas (req, res){
		try {
			const partidas = await partidasModel.getAllPartidas()
			res.status(200).send(partidas)
		} catch (error) {
			console.log(error)
		}
	}

	static async relacionarPeriodoPartidas(req, res){
		try {
			const periodoInfo = req.body
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const relatePeriodoPartidas = await partidasModel.relacionarPeriodoPartidas(periodoInfo)
			res.status(200).send({mssg: "OK"})
		} catch (error) {
			res.status(200).send(error)
		}
	}

	static async getAllPeriodoPartidas(req, res){
		try {
			const periodoPartidas = await partidasModel.getAllPeriodoPartidas();
			res.status(200).send(periodoPartidas)
		} catch (error) {
			res.send(error)
		}
	}


}
