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
  static async getByPeriod (userId, periodId) {
    const [solicitudes] = await connectionDB.query('SELECT * FROM solicitud WHERE userId = ?', [userId], 'AND periodoId = ?', [periodId])
    return solicitudes
  }

  static async getQuantity (userId) {
    const [solicitudes] = await connectionDB.query('SELECT * FROM solicitud WHERE userId = ?', [userId])
    const cantidad = solicitudes.length
    return cantidad
  }

  static async getFinalizadas (userId) {
    const [solicitudesF] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 3 AND userId = ?', [userId]
    )
    const cantidad = solicitudesF.length
    return cantidad
  }

  static async getAnuladas (userId) {
    const [solicitudesA] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 2 AND userId = ?', [userId]
    )
    const cantidad = solicitudesA.length
    return cantidad
  }

  static async getActivas (userId) {
    const [solicitudesR] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 1 AND userId = ?', [userId]
    )
    const cantidad = solicitudesR.length
    return cantidad
  }
}
