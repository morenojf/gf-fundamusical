import { soporteModel } from '../model/soporteModel.mjs'
import { PORT } from '../../../configs/server.mjs'

export class soporteController {
  static async addSoporte(req, res) {
    // Obtener ID de solicitud:
    const solicitudId = req.params.id // ID de solicitud

    // Accede a la ruta de cada archivo:
    const rutaFactura = req.files['rutaFactura']
      ? req.files['rutaFactura'][0].filename // ruta del archivo (string)
      : null
    const rutaCartaPyR = req.files['rutaCartaPyR']
      ? req.files['rutaCartaPyR'][0].filename // ruta del archivo (string)
      : null

    const soporteData = req.body // Return Type:Object {monto: string, referenciaOperacion: string, tipoMoneda: string}
    try {
      const idCreatedSoporte = await soporteModel.addSoporte(
        solicitudId,
        soporteData,
        rutaFactura,
        rutaCartaPyR
      )

      res.status(200).json({ data: 'OK', SoporteId: idCreatedSoporte })
    } catch (error) {
      console.log(error)
    }
  }

  static async getSoporteInfo(req, res) {
    try {
      const soporteInfo = await soporteModel.getSoporte()

      for (let index = 0; index < soporteInfo.length; index++) {
        soporteInfo[index] = {
          ...soporteInfo[index],
          soporteInvoice: `http://localhost:${PORT}/${soporteInfo[index].soporteInvoice}`,
          soporteLetter: `http://localhost:${PORT}/${soporteInfo[index].soporteLetter}`
        }
      }

      console.log('soporteInfo', soporteInfo)

      res.status(200).json(soporteInfo)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
