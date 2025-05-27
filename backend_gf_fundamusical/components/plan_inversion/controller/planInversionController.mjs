import { planInversionModel } from '../model/planInversionModel.mjs'

export class planInversionController {
  static async createNewPI(req, res) {
	try {
      const id  = 1 // Asumiendo que el ID del usuario se pasa como parámetro del JWT
	  const CreatedPlanId = await planInversionModel.creatNewPI(id);
	  res.status(201).json({ message: 'Nuevo Plan de Inversión creado', id: CreatedPlanId });
	} catch (err) {
	  return res.status(500).send("ERROR AL CREAR NUEVO PLAN DE INVERSIÓN");
	}
  }

}