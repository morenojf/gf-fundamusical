import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class planInversionModel {
  static async getAll () {
	const [planes] = await connectionDB.query('SELECT * FROM planInversion')
	if (!planes.length) {
	  return console.log('No existen Planes de Inversión creados')
	}
	console.log('Planes de Inversión:', planes)
	return planes
  }

  static async creatNewPI (id) {
	const query = 'INSERT INTO planInversion (userId) VALUES (?)'
	const userId = id // Esto debería ser dinámico, dependiendo del usuario que esté creando el Plan de Inversión
	// const planAño = 2025 // Esto debería ser dinámico, dependiendo del año actual
	const [result] = await connectionDB.query(query, [userId])
	return result.insertId // Retorna el ID del nuevo Plan de Inversión creado
  }
}