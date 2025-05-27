import { planInversionModel } from '../model/planInversionModel.mjs'
import { periodoModel } from '../../periodos/model/periodoModel.mjs'

export class planInversionController {
  static async createNewPI (req, res) {
    try {
      const userId = 1 // Asumiendo que el ID del usuario se pasa como parámetro del JWT
      const CreatedPlanId = await planInversionModel.creatNewPI(userId)
      // llamar funcion para crear el periodo inicial y pasar el id del plan de inversion creado
      const createdInitialPeriod = await periodoModel.createPeriod(CreatedPlanId)
      res
        .status(201)
        .json(
          [{
            message: 'Nuevo Plan de Inversión creado',
            planInversionId: CreatedPlanId
          },
          {
            message: 'Periodo inicial creado',
            periodoId: createdInitialPeriod
          }]
        )
    } catch (err) {
      return res.status(500).send('ERROR AL CREAR NUEVO PLAN DE INVERSIÓN')
    }
  }
}
