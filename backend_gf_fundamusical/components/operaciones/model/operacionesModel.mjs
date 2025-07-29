import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

export class operacionModel {

	// Obtener todas las operaciones 
	static async getAllOperaciones(){
		try {
			const [operaciones] = await connection.query('SELECT * FROM operacion')
			return operaciones
		} catch (error) {
			return (error)
		}
	}

	// Crear una operaciones
  static async createOperacion(data, rutaFactura, rutaCarta) {
    try {
      // Formato de fecha aceptado por la BD YYYY-MM-DD HH:MM:SS
      function formatToMySQLDatetime(dateString, timeString) {
        // 1. Crear objetos Date a partir de las cadenas
        const dateObj = new Date(dateString)
        const timeObj = new Date(timeString)

        // 2. Extraer los componentes de la fecha del objeto de fecha
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Mes es 0-indexado
        const day = String(dateObj.getDate()).padStart(2, '0')

        // 3. Extraer los componentes de la hora del objeto de hora
        const hours = String(timeObj.getHours()).padStart(2, '0')
        const minutes = String(timeObj.getMinutes()).padStart(2, '0')
        const seconds = String(timeObj.getSeconds()).padStart(2, '0')

        // 4. Combinar y formatear la cadena final
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      }

      const formattedDatetime = formatToMySQLDatetime(data.fecha, data.hora)

      const operacionData = data
      const rutaComprobante = rutaFactura
      const rutaSoporte = rutaCarta

      const createdOperacion = await connection.query(
        'INSERT INTO operacion (nucleoId, periodoId, partidaId, operacionFecha, operacionTipo, operacionMonto, operacionDescripcion, operacionRefN, operacionSoporte, operacionCarta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          parseInt(operacionData.nucleoId),
          parseInt(operacionData.selectedPeriodo),
          operacionData.partida === 'null' ? null : operacionData.partida,
          formattedDatetime,
          operacionData.ingresoEgreso,
          parseFloat(operacionData.montoOperacion),
          operacionData.descripcion,
          operacionData.nComprobante,
          rutaComprobante,
          rutaSoporte
        ]
      )
      return createdOperacion
    } catch (error) {
      return error
    }
  }

  // Delete operacion by ID 
  static async deleteOperacionById(operacionId){
	try {
		const [deletedOperacion] = await connection.query('DELETE FROM operacion WHERE operacionId = (?)', [operacionId])
		return deletedOperacion
	} catch (error) {
		return error
	}
  }
}
