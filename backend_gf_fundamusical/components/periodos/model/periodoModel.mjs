import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

// // TESTING FUNCIONALITY
// export class test {
//   static async testing () {
//     const [nucleos] = await connectionDB.query('SELECT * FROM nucleo')
//     console.log([nucleos])
//     return nucleos
//   }
// }

// await test.testing()

export class periodoModel {
  static async getByCondition (id) {
	const [periodo] = await connectionDB.query('SELECT * FROM planInversion_periodo WHERE planInversionId = ?', [id])
	if (!periodo.length) {
		return console.log('No existen periodos para este Plan de Inversión')
	} else return periodo
  }
}
