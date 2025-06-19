import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class planCuentaModel {
  // OBTIENE PLANES DE CUENTA PARA CREACION DE PI
  static async getAll () {
    const [planesCuenta] = await connectionDB.query('SELECT * FROM planCuenta')
    return planesCuenta
  }

  // Esta funcion ademas de delvolver los id de planes de cuenta disponibbles para ese plan de inversion
  // devuelve los nombres de esos id de planes de cuenta
  static async getByPIPC (currentPIid) {
    const [availablePC] = await connectionDB.query(
      'SELECT * from planInversion_planCuenta WHERE planInversionId = ? ',
      [currentPIid]
    )

    const planesCuenta = []

    for (let i = 0; i < availablePC.length; i++) {
      const PIPCid = availablePC[i].PlanInversionPlanCuentaId
      const planCuentaId = availablePC[i].planCuentaId
      const [planCuentaName] = await connectionDB.query(
        'SELECT planCuentaName FROM planCuenta WHERE planCuentaId = ?',
        [planCuentaId]
      )
	  
      if (planCuentaName && planCuentaName.length > 0) {
		  const nombrePlanCuenta = planCuentaName[0].planCuentaName
		  planesCuenta.push({ Nombre: nombrePlanCuenta, Plan_Id: planCuentaId, PIPCid: PIPCid})
		}
    }

 for (let index = 0; index < planesCuenta.length; index++) {
  const PIPCid = planesCuenta[index].PIPCid;
  const [foundSubcategorias] = await connectionDB.query(
    'SELECT subcategoriaId FROM planInversion_subCategoria WHERE PlanInversionPlanCuentaId = ?',
    [PIPCid]
  );

  // Creamos un array para las subcategorias enriquecidas
  const subcategoriasConNombre = [];

  for (let j = 0; j < foundSubcategorias.length; j++) {
    const subcategoria = foundSubcategorias[j];

    const [scName] = await connectionDB.query(
      'SELECT subcategoriaName FROM subcategoria WHERE subcategoriaId = ?',
      [subcategoria.subcategoriaId]
    );

    // scName[0] es el objeto con subcategoriaName
    subcategoriasConNombre.push({
      subcategoriaId: subcategoria.subcategoriaId,
      subcategoriaName: scName[0]?.subcategoriaName || null
    });
  }

  // Asignamos el array enriquecido al objeto actual
  planesCuenta[index].subcategorias = subcategoriasConNombre;
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
