import { PImodel } from '../PI-model/PImodel.mjs'

export class PIcontroller {
  static async createNewPI (req, res) {
    try {
      // const PIdata = req.body estos serán los datos enviados por el front end en el cuerpo de la peticion
      const PIdata = req.body
      await PImodel.createPI(PIdata) // esto no retorna nada

      res.status(200).send({message: 'Plan de Inversión creado satisfactoriamente'})
    } catch (err) {
		console.log('esto estas enviando', req.body)
      return res.status(500).send('Error al crear el nuevo plan de inversion ', err)
    }
  }
}
