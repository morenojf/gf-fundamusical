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

	// CREAR UNA NUEVA PARTIDA
	static async createPartida(req, res){
		try {
			const newPartida = req.body
			const createdPartida = await partidasModel.createPartida(newPartida)
			res.status(200).send(createdPartida)
		} catch (error) {
			res.status(400).send(error)
		}		
	}

	// ACTUALIZAR EL NOMBRE DE UNA PARTIDA
	static async updatePartida(req, res){
		try {
			const newPartida = req.body
			const updatedPartida = await partidasModel.updatePartida(newPartida)
			res.status(200).send(updatedPartida)
		} catch (error) {
			res.status(400).send(error)
		}
	}

	// ACTIVAR PARTIDA
	static async activatePartida(req, res){
		try {
			const partida = req.body
			const partidaActivated = await partidasModel.activatePartida(partida)
			res.status(200).send(partidaActivated)
		} catch (error) {
			res.status(400).send(error)
		}

	}

	// DESACTIVAR PARTIDA 
	static async deactivatePartida(req, res){
		try {
			const partida = req.body
			const partidaDeactivated = await partidasModel.deactivatePartida(partida)
			res.status(200).send(partidaDeactivated)
		} catch (error) {
			res.status(400).send(error)
		}
	}


}
