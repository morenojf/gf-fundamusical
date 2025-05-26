import { connection } from "../../../services/mysql-db/dbfundamusical.mjs";

const connectionDB = connection

export class planCuentaModel {
	static async getAll () {
		const [planesCuenta] = await connectionDB.query('SELECT * FROM planCuenta')
		return planesCuenta
	}
}
