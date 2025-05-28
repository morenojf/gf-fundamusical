import { solicitudModel } from '../model/solicitudModel.mjs'
import { periodoModel } from '../../periodos/model/periodoModel.mjs' // GET CURRENT PERIOD

export class solicitudController {
  static async getByPeriod(req, res) {
    const periodId = req.params
    const userId = 1 // Ideally dinamic once JWT is configured
    try {
      const solicitudList = await solicitudModel.getByPeriod(userId, periodId) // RETURN ALL SOLICITUDES BY SELECTED PERIOD
      if (solicitudList.length === 0) {
        res.send('No hay solicitudes creadas para este periodo')
      } else {
        return res.status(200).json({ solicitudList })
      }
    } catch (error) {
      res.status(500).send('Internal server error', error)
    }
  }

  static async createSolicitud(req, res) {
    const solicitudData = req.body
    const currentPeriodoId = await periodoModel.currentPeriod() // RETURN CURRENT PERIOD ID

    try {
      const createdSolicitud = await solicitudModel.createSolicitud(
        solicitudData,
        currentPeriodoId
      )
      return res
        .status(200)
        .json({
          message: 'Se creó con exito la solicitud ID: ',
          createdSolicitud: createdSolicitud
        })
    } catch (error) {
      console.log(error)
      return res.status(500).send('Fallo al crear la solicitud')
    }
  }
}
