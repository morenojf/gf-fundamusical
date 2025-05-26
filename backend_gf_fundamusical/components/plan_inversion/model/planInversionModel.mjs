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

export class planInversionModel {
  static async getAll () {
	const [planes] = await connectionDB.query('SELECT * FROM planInversion')
	return planes
  }
}