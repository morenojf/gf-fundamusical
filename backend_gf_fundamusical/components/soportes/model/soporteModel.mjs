import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'
const connectionDB = connection

export class soporteModel {
  static async addSoporte(data, userId, solicitudId) {
    const targetId = solicitudId
    const soporteInfo = data
    const usuario = userId

    const [soporteAttached] = await connectionDB.query(
      'INSERT INTO soporte (userId, solicitudId, soporteInvoice, soporteLetter, soporteMonto, soporteMoneda) VALUES (?, ?, ?, ?, ?, ?)',
      [
        usuario,
        targetId,
        soporteInfo.FacturaURL,
        soporteInfo.CartaPyRURL,
        soporteInfo.MontoFactura,
        soporteInfo.TipoMoneda
      ]
    )

	const [createdSoporte] = await connectionDB.query('SELECT * FROM soporte WHERE soporteId = ?', [soporteAttached.insertId])
	return createdSoporte
  }

  static async getSoporte (solicitudId) {
	const targetId = solicitudId
	const [soporteInfo] = await connectionDB.query('SELECT * FROM soporte WHERE solicitudId = ?', [targetId])

	return soporteInfo

  }
}
