import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

export class partidasModel {
  // OBTENER TODAS LAS PARTIDAS
  static async getAllPartidas() {
    try {
      const [partidas] = await connection.query('SELECT * FROM partida')
      return partidas
    } catch (error) {
      console.log(error)
    }
  }

  static async getAllPeriodoPartidas() {
	try {
		const [periodo_partidas] = await connection.query('SELECT * FROM periodo_partida')
		return periodo_partidas
	} catch (error) {
		return error
	}
  }

  static async relacionarPeriodoPartidas(periodoInfo) {
    try {
      const periodo = periodoInfo
      const findPeriodoId = periodo.find((elemento) => elemento.periodoId)
      const periodoId = findPeriodoId.periodoId
      const partidas = periodoInfo.filter(
        (elemento) => elemento.partidaId !== undefined
      )

      for (let index = 0; index < partidas.length; index++) {
        const partida = partidas[index]

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const fillPeriodoPartida = await connection.query(
          'INSERT INTO periodo_partida (periodoId, partidaId) VALUES (?, ?)',
          [periodoId, partida.partidaId]
        )
      }

      return
    } catch (error) {
      return error
    }
  }
}
