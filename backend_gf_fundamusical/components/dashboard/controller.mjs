// Este controlador es para mostrar la información del dashboard

import { nucleoModel } from '../nucleo/model/nucleoModel.mjs'

import { solicitudModel } from '../solicitudes/model/solicitudModel.mjs'

export class dashboardController {
  static async getAll (req, res) {
    try {
      const userId = 1 // ideally this is dynamic and comes from JWT token

      const nucleoInfo = await nucleoModel.getPartial(userId)
      const solicitudQ = await solicitudModel.getQuantity(userId)
      const solicitudF = await solicitudModel.getFinalizadas(userId)
      const solicitudA = await solicitudModel.getAnuladas(userId)
      const solicitudR = await solicitudModel.getActivas(userId)

      return res.status(200).json({
        nucleoInfo,
        totalSolicitudes: solicitudQ,
        totalFinalizadas: solicitudF,
        totalAnuladas: solicitudA,
        totalActivas: solicitudR
      })
    } catch (err) {
      return res.status(500).send('ERROR AL OBTENER DATOS DEL DASHBOARD')
    }
  }
}
