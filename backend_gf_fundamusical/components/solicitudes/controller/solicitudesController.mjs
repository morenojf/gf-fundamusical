import { solicitudModel } from '../model/solicitudModel.mjs'
// import { periodoModel } from '../../periodos/model/periodoModel.mjs' // GET CURRENT PERIOD
// import { planCuentaModel } from '../../planes_de_cuenta/model/planCuentaModel.mjs'

export class solicitudController {
  static async getByUserId(req, res) {
    const userId = req.params.id
    try {
      const solicitudes = await solicitudModel.getByUserId(userId)

      if (!solicitudes.length) {
        res
          .status(404)
          .send({ result: 'No existen solicitudes creadas por este usuario' })
      } else {
        res.status(200).send(solicitudes)
      }
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  }

  static async getByPeriod(req, res) {
    const periodId = req.params.id
    const userId = 1 // Ideally dinamic once JWT is configured
    try {
      const solicitudList = await solicitudModel.getByPeriod(userId, periodId) // RETURN ALL SOLICITUDES BY SELECTED PERIOD

      const updatedSolicitudList = await solicitudModel.addArticulos(
        solicitudList
      )

      if (updatedSolicitudList === null) {
        return res.status(200).json(solicitudList)
      } else {
        return res.status(200).json(updatedSolicitudList)
      }
    } catch (error) {
      res.status(404).send({ error: error.message })
    }
  }

  static async createSolicitud(req, res) {
    const solicitudData = req.body

    // Aliens
    // const peticionPC = await planCuentaModel.getPCnameByPIPC(
    //   solicitudData[0].planInversionplanCuentaId
    // )
    // const PCname = peticionPC[0].planCuentaName

    try {
      const createdSolicitud = await solicitudModel.createSolicitud(
        solicitudData
      )
      return res.status(200).json({
        message: 'Se creó con exito la solicitud ID: ',
        createdSolicitud
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send('Fallo al crear la solicitud')
    }
  }

  static async createMotivoAnulacion(req, res) {
    const solicitudId = req.params.id
    const motivoText = req.body.motivoAnulacion
    try {
      const solicitudAnulada = await solicitudModel.createMotivoAnulacion(
        solicitudId,
        motivoText
      )
      if (solicitudAnulada) {
        return res.status(200).json({
          message: 'Solicitud anulada con éxito',
          solicitudId
        })
      } else {
        return res.status(500).send('Error al anular la solicitud')
      }
    } catch (error) {
      console.error('Error al crear motivo de anulación:', error)
    }
  }

  static async changeStatus(req, res) {
    const solicitudId = req.params.id
    const newStatus = req.body.newStatus
    try {
      const statusChanged = await solicitudModel.changeStatus(
        solicitudId,
        newStatus
      )
      return res.status(200).json({
        message: 'Estado cambiado',
        statusChanged
      })
    } catch (error) {
      console.log({ error: error })
    }
  }

  static async getMotivosAnulacion(req, res) {
    try {
      const motivosAnulacion = await solicitudModel.getMotivosAnulacion()
      return res.status(200).send(motivosAnulacion)
    } catch (error) {
      console.log({ error: error.message })
    }
  }
}
