import { planInversionModel } from '../../plan_inversion/model/planInversionModel.mjs'
import { periodoModel } from '../../periodos/model/periodoModel.mjs'
import { PImodel } from '../PI-model/PImodel.mjs'

export class PIcontroller {
  static async createNewPI(req, res) {
	try {
	  const PIdata = req.body;

	  const planInversionId = PIdata.planInversionId; 
	  const CreatedInitalPeriod = await periodoModel.createPeriod(planInversionId) // Retorna el ID del nuevo periodo creado
	  
	  
	  const InsertPIData = await PImodel.createPI(PIdata);

	  res.status(200).send('Plan de Inversión creado exitosamente');
	}
	  catch (err) {
	  return res.status(500).send("ERROR AL OBTENER DATOS DE GESTION");
	}
  }
}