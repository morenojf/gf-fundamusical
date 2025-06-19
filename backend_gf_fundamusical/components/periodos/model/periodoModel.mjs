import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'
import { monthConvertion } from '../../../services/utils.mjs'

const connectionDB = connection

export class periodoModel {

	static async getPeriodById(periodoId){
		const [periodo] = await connectionDB.query(
			'SELECT * FROM periodo WHERE periodoId = ?', 
			[periodoId]
		)

		if(!periodo.length) {
			throw new Error('No existen periodos con ese ID');
			
		} else {
			// se envia solo el objeto no un array de objetos
			return periodo[0]
		}
	}



  static async getByCondition(id) {
    const [periodo] = await connectionDB.query(
      'SELECT * FROM periodo WHERE planInversionId = ?',
      [id]
    )
    if (!periodo.length) {
      return console.log('No existen periodos para este Plan de Inversión')
    } else {

		// This will create the new key nombreMes
		const mes = "nombreMes"

		// This will insert into the object selected a new pair key:value with key nombreMes and value el nombre del mes using monthConvertion funct
		for (let index = 0; index < periodo.length; index++) {
			const element = periodo[index];
			const nombreMes = monthConvertion(element.periodoMes);
			element[mes] = nombreMes
		}
      return periodo
    }
  }

  static async createPeriod(planInversionId) {
    const query = 'INSERT INTO periodo (planInversionId) VALUES (?)'
    const [result] = await connectionDB.query(query, [planInversionId])
    const [periodos] = await connectionDB.query(
      'SELECT * FROM periodo WHERE periodoId = ?',
      [result.insertId]
    )
    return periodos // Devuelve el objeto del periodo creado
  }

  static async currentPeriod() {
    const [currentPeriodId] = await connectionDB.query(
      'SELECT periodoId FROM periodo WHERE periodoMes = (MONTH(CURRENT_DATE()))'
    )
    return currentPeriodId[0].periodoId
  }

  static async currentPI() {
    const [currentPeriodId] = await connectionDB.query(
      'SELECT periodoId FROM periodo WHERE periodoMes = (MONTH(CURRENT_DATE()))'
    )
    const [currentPI] = await connectionDB.query(
      'SELECT planInversionId FROM periodo WHERE planInversionId = (?)',
      [currentPeriodId[0].periodoId]
    )
    return currentPI[0].planInversionId
  }
}
