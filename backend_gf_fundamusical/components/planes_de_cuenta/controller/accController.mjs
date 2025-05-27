// 1. OBTENER TODOS LOS PLANES DE CUENTA PARA MOSTRARLOS EN EL DROP DOWN SELECT
// 2. DROP DOWN 2 DINAMICO EL FRONT LE ENVIA EL ID AL BACK DEL PLAN DE CUENTA SELECCIONADO POR URL /gestion/modal/plancuenta-subcategoria/:id PETICION HECHA DENTRO DEL MODAL
// 3. EL BACKEND FILTRA LA INFORMACIÓN Y REGRESA LAS SUBCATEGORIAS RELACIONADAS

import { planCuentaModel } from '../model/planCuentaModel.mjs'

export class planCuentaController {
  static async getAll (req, res) {
    const planesCuenta = await planCuentaModel.getAll()
    return res.status(200).json(planesCuenta)
  }
}
