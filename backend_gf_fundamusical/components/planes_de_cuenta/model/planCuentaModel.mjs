import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class planCuentaModel {
  // OBTIENE PLANES DE CUENTA PARA CREACION DE PI
  static async getAll () {
    const [planesCuenta] = await connectionDB.query('SELECT * FROM planCuenta')
    return planesCuenta
  }

  static async getByPIPC (currentPIid) {
    const [availablePC] = await connectionDB.query(
      'SELECT planCuentaId from planInversion_planCuenta WHERE planInversionId = ? ',
      [currentPIid]
    )

    const planesCuenta = []

    for (let i = 0; i < availablePC.length; i++) {
      const element = availablePC[i].planCuentaId
      const planCuentaId = availablePC[i].planCuentaId
      const [planCuentaName] = await connectionDB.query(
        'SELECT planCuentaName FROM planCuenta WHERE planCuentaId = ?',
        [element]
      )
      if (planCuentaName && planCuentaName.length > 0) {
        const nombrePlanCuenta = planCuentaName[0].planCuentaName
        planesCuenta.push({ Nombre: nombrePlanCuenta, Plan_Id: planCuentaId })
      }
    }
    // RETORNA
    return planesCuenta
  }

  static async getPCnameByPIPC (PIPCid) {
    const [PCid] = await connectionDB.query(
      'SELECT planCuentaId FROM planInversion_planCuenta WHERE PlanInversionPlanCuentaId = ?',
      [PIPCid]
    )
    const [planCuentaName] = await connectionDB.query(
      'SELECT planCuentaName FROM planCuenta WHERE planCuentaId = ?',
      [PCid[0].planCuentaId]
    )

    return planCuentaName
  }
}
