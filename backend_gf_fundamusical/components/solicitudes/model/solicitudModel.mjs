import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class solicitudModel {
  static async getByPeriod (userId, periodId) {
    const [solicitudes] = await connectionDB.query(
      'SELECT * FROM solicitud WHERE userId = ?',
      [userId],
      'AND periodoId = ?',
      [periodId]
    )
    return solicitudes
  }

  static async getQuantity (userId) {
    const [solicitudes] = await connectionDB.query(
      'SELECT * FROM solicitud WHERE userId = ?',
      [userId]
    )
    const cantidad = solicitudes.length
    return cantidad
  }

  static async getFinalizadas (userId) {
    const [solicitudesF] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 3 AND userId = ?',
      [userId]
    )
    const cantidad = solicitudesF.length
    return cantidad
  }

  static async getAnuladas (userId) {
    const [solicitudesA] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 2 AND userId = ?',
      [userId]
    )
    const cantidad = solicitudesA.length
    return cantidad
  }

  static async getActivas (userId) {
    const [solicitudesR] = await connection.query(
      'SELECT * FROM solicitud WHERE solicitudStatus = 1 AND userId = ?',
      [userId]
    )
    const cantidad = solicitudesR.length
    return cantidad
  }

  static async createSolicitud (solicitudData, periodoId, PCname) {
    const userId = solicitudData[0].userId
    const PIPCid = solicitudData[0].planInversionplanCuentaId
    const motivo = solicitudData[0].motivo
    const planCuentaName = PCname
    const periodId = periodoId

    const createdSolicitudId = await connectionDB.query(
      'INSERT INTO solicitud (userId, periodoId, planInversionPlancuentaId, selectedPlanCuenta, solicitudMotivo) VALUES (?, ?, ?, ?, ?)',
      [userId, periodId, PIPCid, planCuentaName, motivo]
    )

    return createdSolicitudId[0].insertId
  }
}
