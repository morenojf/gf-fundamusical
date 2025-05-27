import { solicitudModel } from '../model/solicitudModel.mjs'

export class solicitudController {
  static async getByPeriod (req, res) {
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
}
