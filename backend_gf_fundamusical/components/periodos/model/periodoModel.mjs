import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class periodoModel {

  static async createPeriodo(periodoInfo) {
    try {
      let nucleoId = periodoInfo.find((periodo) => periodo.nucleoId)
      let periodoYear = periodoInfo.find((periodo) => periodo.selectedYear)

      let [createdPeriodoId] = await connection.query(
        'INSERT INTO periodo (periodoAnio, nucleoId) VALUES (?, ?)',
        [periodoYear.selectedYear, nucleoId.nucleoId]
      )
      return createdPeriodoId.insertId
    } catch (error) {
      console.log(error)
    }
  }

  static async getPeriodos(){
	try {
		const [periodosArray] = await connection.query('SELECT * FROM periodo')
		return periodosArray
	} catch (error) {
		console.log(error)
	}
  }

  static async getPeriodById(periodoId) {
    const [periodo] = await connectionDB.query(
      'SELECT * FROM periodo WHERE periodoId = ?',
      [periodoId]
    )

    if (!periodo.length) {
      throw new Error('No existen periodos con ese ID')
    } else {
      // se envia solo el objeto no un array de objetos
      return periodo[0]
    }
  }

}
