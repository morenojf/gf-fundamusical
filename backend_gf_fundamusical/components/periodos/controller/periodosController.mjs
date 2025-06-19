import { periodoModel } from '../model/periodoModel.mjs'

export class periodoController {
  static async getPeriodById(req, res) {
    const periodoId = req.params.id
    try {
      const periodoInfo = await periodoModel.getPeriodById(periodoId)
      res.status(200).send(periodoInfo)
    } catch (error) {
      res.status(404).send({error: error.message})
    }
  }
}
