import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class nucleoModel {
  static async getAll () {
    const [nucleos] = await connectionDB.query('SELECT * FROM nucleo')
    return nucleos
  }

  static async getNucleoByUserId(userId){
	try {
		const [nucleoInfo] = await connectionDB.query('SELECT * FROM nucleo WHERE userId = (?)', [userId])
		return nucleoInfo[0]
	} catch (error) {
		console.log(error)
	}
  }

  static async getNucleoByNucleoId(nucleoId){
	try {
		const [nucleoInfo] = await connectionDB.query('SELECT * FROM nucleo WHERE nucleoId = (?)', [nucleoId])
		return nucleoInfo[0]
	} catch (error) {
		return error
	}
  }

  static async updateNucleoBalance(nuevoSaldo, nucleoId){
	try {
		const updatedBalance = await connection.query('UPDATE nucleo SET nucleoSaldo = (?) WHERE nucleoId = (?)', [nuevoSaldo, nucleoId])
		return updatedBalance
	} catch (error) {
		return error
	}
  }

  static async addToEgresos(montoEgreso, nucleoId){
	try {
		const updatedEgreso = await connection.query('UPDATE nucleo SET nucleoEgresos = (?) WHERE nucleoId = (?)', [montoEgreso, nucleoId])
		return updatedEgreso
	} catch (error) {
		return error
	}
  }

  static async addToIngresos(montoIngreso, nucleoId){
	try {
		const updatedingreso = await connection.query('UPDATE nucleo SET nucleoIngresos = (?) WHERE nucleoId = (?)', [montoIngreso, nucleoId])
		return updatedingreso
	} catch (error) {
		return error
	}
  }

  static async getPartial (userId) {
    const [partialInfo] = await connectionDB.query('SELECT nucleoName, nucleoCoordinador, nucleoDirector FROM nucleo WHERE userId = ?', [userId])
    return partialInfo
  }
}
