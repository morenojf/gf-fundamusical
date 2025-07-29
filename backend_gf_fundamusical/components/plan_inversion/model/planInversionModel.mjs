import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class planInversionModel {
  static async getAll () {
    const [planes] = await connectionDB.query('SELECT * FROM planInversion')
    if (!planes.length) {
      return []
    }
    return planes
  }

  static async creatNewPI (id) {
    const query = 'INSERT INTO planInversion (userId) VALUES (?)'
    const userId = id 
    // const planAnio = 2025 // Esto debería ser dinámico, dependiendo del anio actual
    const [result] = await connectionDB.query(query, [userId])
    return result.insertId // Retorna el ID del nuevo Plan de Inversión creado
  }
}
