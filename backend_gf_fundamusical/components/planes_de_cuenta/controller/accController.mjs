// 1. OBTENER TODOS LOS PLANES DE CUENTA PARA MOSTRARLOS EN EL DROP DOWN SELECT
// 2. DROP DOWN 2 DINAMICO EL FRONT LE ENVIA EL ID AL BACK DEL PLAN DE CUENTA SELECCIONADO POR URL /gestion/modal/plancuenta-subcategoria/:id PETICION HECHA DENTRO DEL MODAL
// 3. EL BACKEND FILTRA LA INFORMACIÓN Y REGRESA LAS SUBCATEGORIAS RELACIONADAS
// import { periodoModel } from '../../periodos/model/periodoModel.mjs'
import { planCuentaModel } from '../model/planCuentaModel.mjs'

export class planCuentaController {
  // OBTIENE PLANES DE CUENTA PARA CREACION DE PLANES DE INVERSION
  static async getAll (req, res) {
	res.header('Access-Control-Allow-Origin', '*')
    const planesCuenta = await planCuentaModel.getAll()
    return res.status(200).json(planesCuenta)
  }

  // OBTIENE PLANES DE CUENTA SEGUN EL PLAN DE INVERSION
  static async getByPIPC (req, res) {

	// ESTO OBTIENE EL ID DEL PLAN DE INVERSION ACTUAL SEGUN LA FECHA
    // const currentPIid = await periodoModel.currentPI()

	const idPi = req.params.id

    // Return ArrayObject con nombre plan cuenta y su Id, disponibles segun el PIPC
    const availablePC = await planCuentaModel.getByPIPC(idPi)

    if (!availablePC.length) {
		res
        .status(404)
        .send(
          'No hay planes de cuenta seleccionados para este plan de inversion'
        )
     
    } else {
       res.status(200).json(availablePC)
    }
  }

  static async getPCnameByPIPC (req, res) {
	const { id } = req.params
	const PC = await planCuentaModel.getPCnameByPIPC(id)
	if (PC) {
	  return res.status(200).send(PC)
	} else {
	  return res.status(204).send('No existe un plan de cuenta para este PIPC')
	}
  }
}
