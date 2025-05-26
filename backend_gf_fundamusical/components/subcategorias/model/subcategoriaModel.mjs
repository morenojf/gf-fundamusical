import { connection } from "../../../services/mysql-db/dbfundamusical.mjs";

const connectionDB = connection

export class subcategoriaModel {
	static async getAll () {
		const [subcategorias] = await connectionDB.query('SELECT * FROM subcategoria')
		return [subcategorias]
	}

	static async getById (id) {
	const [filteredCategory] = await connectionDB.query('SELECT * FROM subcategoria WHERE planCuentaId = ?', [id])
	if (!filteredCategory.length) {
		return console.log('No existen subcategorias para este plan de cuentas')
	} else return [filteredCategory]
  }

}