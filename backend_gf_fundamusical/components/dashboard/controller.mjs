// Este controlador es para mostrar la información del dashboard

import { nucleoModel } from '../nucleo/model/nucleoModel.mjs'

import { solicitudModel } from '../solicitudes/model/solicitudModel.mjs'

export class dashboardController {
  static async getAll(req, res) {
    try {
      const nucleoInfo = await nucleoModel.getPartial();
      const solicitudQ = await solicitudModel.getQuantity();
      const solicitudF = await solicitudModel.getFinalizadas();
      const solicitudA = await solicitudModel.getAnuladas();
      const solicitudR = await solicitudModel.getActivas();

      return res.status(200).json({
        nucleoInfo,
        totalSolicitudes: solicitudQ,
        totalFinalizadas: solicitudF,
        totalAnuladas: solicitudA,
        totalActivas: solicitudR,
      });
    } catch (err) {
      return res.status(500).send("ERROR AL OBTENER DATOS DEL DASHBOARD");
    }
  }
}
