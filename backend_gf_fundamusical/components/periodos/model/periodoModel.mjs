import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class periodoModel {
  static async getByCondition (id) {
    const [periodo] = await connectionDB.query(
      'SELECT * FROM periodo WHERE planInversionId = ?',
      [id]
    )
    if (!periodo.length) {
      return console.log('No existen periodos para este Plan de Inversión')
    } else return periodo
  }

  static async createPeriod (planInversionId) {
    const query = 'INSERT INTO periodo (planInversionId) VALUES (?)'
    const [result] = await connectionDB.query(query, [planInversionId])
    const [periodos] = await connectionDB.query(
      'SELECT * FROM periodo WHERE periodoId = ?',
      [result.insertId]
    )
    return periodos // Devuelve el objeto del periodo creado
  }

  static async currentPeriod () {
    const [currentPeriodId] = await connectionDB.query(
      'SELECT periodoId FROM periodo WHERE periodoMes = (MONTH(CURRENT_DATE()))'
    )
    return currentPeriodId[0].periodoId
  }

  static async currentPI () {
    const [currentPeriodId] = await connectionDB.query(
      'SELECT periodoId FROM periodo WHERE periodoMes = (MONTH(CURRENT_DATE()))'
    )
    const [currentPI] = await connectionDB.query(
      'SELECT planInversionId FROM periodo WHERE planInversionId = (?)', [currentPeriodId[0].periodoId]
    )
    return currentPI[0].planInversionId
  }
}
