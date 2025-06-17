import { solicitudModel } from '../model/solicitudModel.mjs'
import { periodoModel } from '../../periodos/model/periodoModel.mjs' // GET CURRENT PERIOD
import { planCuentaModel } from '../../planes_de_cuenta/model/planCuentaModel.mjs'

export class solicitudController {
  static async getByPeriod(req, res) {
    const periodId = req.params.id
    const userId = 1 // Ideally dinamic once JWT is configured
    try {
      const solicitudList = await solicitudModel.getByPeriod(userId, periodId) // RETURN ALL SOLICITUDES BY SELECTED PERIOD

      console.log(solicitudList)

      const updatedSolicitudList = await solicitudModel.addArticulos(
        solicitudList
      )

      if (solicitudList.length === 0) {
        return res
          .status(404)
          .send('No hay solicitudes creadas para este periodo')
      }
      if (updatedSolicitudList === null) {
        return res.status(200).json(solicitudList)
      } else {
        return res.status(200).json(updatedSolicitudList)
      }
    } catch (error) {
      res.status(500).send('Unexpected error')
    }
  }

  static async createSolicitud(req, res) {
    const solicitudData = req.body
    const currentPeriodoId = await periodoModel.currentPeriod() // RETURN CURRENT PERIOD ID
    const peticionPC = await planCuentaModel.getPCnameByPIPC(
      solicitudData[0].planInversionplanCuentaId
    )
    const PCname = peticionPC[0].planCuentaName
    try {
      const createdSolicitud = await solicitudModel.createSolicitud(
        solicitudData,
        currentPeriodoId,
        PCname
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
    console.log('esto estas pasando como nuevo estado', newStatus)
    try {
      const statusChanged = await solicitudModel.changeStatus(
        solicitudId,
        newStatus
      )
      return res.status(200).json({
        message: 'Estado cambiado'
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
		console.log({message: error})
	}
  }
}
