import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'
const connectionDB = connection

export class soporteModel {
  static async addSoporte(solicitudId, soporteData, rutaFactura, rutaCartaPyR) {
    const targetId = solicitudId
    const soporteInfo = soporteData
	const facturaPath = rutaFactura
	const cartaPath = rutaCartaPyR

    const [soporteAttached] = await connectionDB.query(
      'INSERT INTO soporte (referenciaOperacion, solicitudId, soporteInvoice, soporteLetter, soporteMonto, soporteMoneda) VALUES (?, ?, ?, ?, ?, ?)',
      [
        soporteInfo.referenciaOperacion,
		targetId,
        facturaPath,
        cartaPath,
        soporteInfo.monto,
        Number(soporteInfo.tipoMoneda)
      ]
    )

	const [createdSoporte] = await connectionDB.query('SELECT * FROM soporte WHERE soporteId = ?', [soporteAttached.insertId])
	return createdSoporte
  }

  static async getSoporte () {
	const [soporteInfo] = await connectionDB.query('SELECT * FROM soporte')
	return soporteInfo

  }
}
