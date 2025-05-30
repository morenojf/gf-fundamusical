import { solicitudModel } from "../../solicitudes/model/solicitudModel.mjs"
import { soporteModel } from "../model/soporteModel.mjs"


export class soporteController {
  static async addSoporte(req, res) {
    try {
      const data = req.body
      const userId = 1
      const solicitudId = req.params.id
      const addedSoporte = await soporteModel.addSoporte(
        data,
        userId,
        solicitudId
      )

	  const changeStatus = await solicitudModel.changeStatus(solicitudId)
      res.status(200).json(addedSoporte)
    } catch (error) {
      console.log(error)
    }
  }

  static async getSoporteInfo(req, res) {
    try {
      const targetId = req.params.id
      const soporteInfo = await soporteModel.getSoporte(targetId)
      res.status(200).json(soporteInfo)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}