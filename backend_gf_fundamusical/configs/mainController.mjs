// Este archivo es el controlador principal de la API de aqui deriva todos los controladores requeridos por la api.
// Esto no es funcional aun pero mmuestra como se puede hacer.
// Se deben corregir las rutas

import { nucleoController } from '../controllers/nucleoController.mjs'
import { solicitudesController } from '../controllers/solicitudesController.mjs'
import { periodosController } from '../controllers/periodosController.mjs'

export class mainController {
  static dashboard (req, res) {
    const nucleo = nucleoController.getPartial()
    const solicitudes = solicitudesController.getQuantity()
    if (nucleo && solicitudes) {
      return res.json({ nucleo, solicitudes }).status(200)
    }
    return res.status(404).json({ error: 'No se encontraron nucleos y solicitudes' })
  }

  static gestionPlanes (req, res) {
    const nucleo = nucleoController.getPartial()
    const periodos = periodosController.getAll()
    if (nucleo && periodos) {
      return res.json({ nucleo, periodos }).status(200)
    }
    return res.status(404).json({ error: 'No se encontraron nucleos y solicitudes' })
  }
}
