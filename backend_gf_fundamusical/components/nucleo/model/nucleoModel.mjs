import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class nucleoModel {
  static async getAll () {
    const [nucleos] = await connectionDB.query('SELECT * FROM nucleo')
    console.log([nucleos])
    return nucleos
  }

  static async getPartial (userId) {
    const [partialInfo] = await connectionDB.query('SELECT nucleoName, nucleoCoordinador, nucleoDirector FROM nucleo WHERE userId = ?', [userId])
    return partialInfo
  }
}
