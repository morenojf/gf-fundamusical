import { connection } from '../../../services/mysql-db/dbfundamusical.mjs'

const connectionDB = connection

export class PImodel {
  // Esta función crea las relaciones entre Plan de Inversión y Plan de Cuenta, y entre Plan de Inversión y Subcategoría
  static async createPI (datosFormulario) {
    const IdsCreados = []
    for (let index = 0; index < datosFormulario.length; index++) {
      const element = datosFormulario[index]
      const planInversionId = element.planInversionId
      const planCuentaId = element.planCuentaId
      const query =
        'INSERT INTO planInversion_planCuenta (planInversionId, planCuentaId) VALUES (?, ?)'
      const CreatedPIPC = await connectionDB.query(query, [
        planInversionId,
        planCuentaId
      ])
      const PIPCid = CreatedPIPC[0].insertId // INSERTID es una propiedad de la base de datos mysql si la tabla tiene una columna autoincremental, que es el caso de la tabla planInversion_planCuenta
      IdsCreados.push(PIPCid)
    }

    for (let index = 0; index < datosFormulario.length; index++) {
      const element = datosFormulario[index]
      for (
        let subIndex = 0;
        subIndex < element.subcategoriasSeleccionadas.length;
        subIndex++
      ) {
        const subcategoriaId = element.subcategoriasSeleccionadas[subIndex]
        const PIPCid = IdsCreados[index]
        const query =
          'INSERT INTO planInversion_subCategoria (PlanInversionPlanCuentaId, subcategoriaId) VALUES (?, ?)'
        await connectionDB.query(query, [PIPCid, subcategoriaId])
      }
    }
  } 
}
