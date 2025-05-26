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

export class solicitudModel {
  static async getByCond() {
    const [solicitudes] = await connectionDB.query("SELECT * FROM solicitud");
    console.log([nucleos])
    return nucleos
  }

  static async getQuantity() {
    const [solicitudes] = await connectionDB.query('SELECT * FROM solicitud');
	const cantidad = solicitudes.length
	return cantidad
  } 

  static async getFinalizadas () {
	const [solicitudesF] = await connection.query('SELECT * FROM solicitud WHERE solicitudStatus = 3')
	const cantidad = solicitudesF.length
	return cantidad
  }

  static async getAnuladas () {
	const [solicitudesA] = await connection.query('SELECT * FROM solicitud WHERE solicitudStatus = 2')
	const cantidad = solicitudesA.length
	return cantidad
  }

  static async getActivas () {
	const [solicitudesR] = await connection.query('SELECT * FROM solicitud WHERE solicitudStatus = 1')
	const cantidad = solicitudesR.length
	return cantidad
  }
}
