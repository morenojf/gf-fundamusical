// Este controlador es para mostrar la información de vista Gestion de planes

import { nucleoModel } from '../nucleo/model/nucleoModel.mjs'
import { planInversionModel } from '../plan_inversion/model/planInversionModel.mjs'
import { periodoModel } from '../periodos/model/periodoModel.mjs'

export class gestionController {
  static async getAll(req, res) {
    try {
      res.header('Access-Control-Allow-Origin', '*')
      const { id } = req.params
      const userId = 1
      const nucleoInfo = await nucleoModel.getPartial(userId)
      const planesInversion = await planInversionModel.getAll()
      const periodos = await periodoModel.getByCondition(id)

      res.status(200).json({
        nucleoInfo,
        planes: planesInversion || [],
        periodos: periodos || []
      })
    } catch (err) {
      return res.status(500).send('ERROR AL OBTENER DATOS DE GESTION')
    }
  }
}
