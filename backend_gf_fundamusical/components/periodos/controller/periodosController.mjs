import { periodoModel } from '../model/periodoModel.mjs'

export class periodoController {

  static async createPeriodo(req, res) {
    try {
      let periodoInfo = req.body
      let createdPeriodoId = await periodoModel.createPeriodo(periodoInfo)

      res.status(200).send(createdPeriodoId)
    } catch (error) {
      console.log(error)
    }
  }

  static async getPeriodos(req, res) {
    try {
      const periodosArray = await periodoModel.getPeriodos()

      res.status(200).send(periodosArray)
    } catch (error) {
      res.send(error)
      console.log(error)
    }
  }

  static async getPeriodById(req, res) {
    const periodoId = req.params.id
    try {
      const periodoInfo = await periodoModel.getPeriodById(periodoId)
      res.status(200).send(periodoInfo)
    } catch (error) {
      res.status(404).send({ error: error.message })
    }
  }
}
