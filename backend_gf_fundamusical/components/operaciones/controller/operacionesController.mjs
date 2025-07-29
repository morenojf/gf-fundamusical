// import { balancesController } from "../../balances/controller/balancesController.mjs";
import { PORT } from '../../../configs/server.mjs'
import { balancesController } from '../../balances/controller/balancesController.mjs'
import { operacionModel } from '../model/operacionesModel.mjs'

export class operacionController {
  // Obtener todas las operaciones
  static async getAllOperaciones(req, res) {
    try {
      const operaciones = await operacionModel.getAllOperaciones()

      for (let index = 0; index < operaciones.length; index++) {
        operaciones[index] = {
          ...operaciones[index],
          operacionSoporte: `http://localhost:${PORT}/${operaciones[index].operacionSoporte}`,
          operacionCarta: `http://localhost:${PORT}/${operaciones[index].operacionCarta}`
        }
      }

      res.status(200).send(operaciones)
    } catch (error) {
      res.send(error)
    }
  }

  // Crear una operacion
  static async createOperacion(req, res) {
    try {
      const operacionData = req.body

      // Accede a la ruta de cada archivo:
      const rutaFactura = req.files['facturaRuta']
        ? req.files['facturaRuta'][0].filename // ruta del archivo (string)
        : null
      const rutaCarta = req.files['soporteCartaRuta']
        ? req.files['soporteCartaRuta'][0].filename // ruta del archivo (string)
        : null

      const createdOperacion = await operacionModel.createOperacion(
        operacionData,
        rutaFactura,
        rutaCarta
      )

      if (operacionData.ingresoEgreso === 'EGRESO') {
        await balancesController.adjustEgreso(
          operacionData.montoOperacion,
          parseInt(operacionData.nucleoId)
        )
      } else {
        await balancesController.adjustIngreso(
          operacionData.montoOperacion,
          parseInt(operacionData.nucleoId)
        )
      }

      res.status(200).send(createdOperacion)
    } catch (error) {
      console.log(error)
    }
  }

  // borrar operacion por id
  static async deleteOperacionById(req, res) {
    try {
      const operacionToDelete = req.params.id
      const deletedOperacion = await operacionModel.deleteOperacionById(
        operacionToDelete
      )
      res.status(200).send(deletedOperacion)
    } catch (error) {
      res.send(error)
    }
  }

  // ajustar ingreso
  static async adjustBalance(req, res) {
    try {
      const operacion = req.body


	  // AL ESTAR REVIRTIENDO UNA OPERACION ENTONCES SE TRABAJA CON LAS OPERACIONES INVERSAS COMO PARA DESHACER LA ACCIÓN Y REINTEGRAR EL DINERO AL NUCLEO
      if (operacion.operacionTipo === 'INGRESO') {
        const updatedBalance = await balancesController.updateIngreso(
          operacion.operacionMonto,
          operacion.nucleoId
        )
        return res.status(200).send(updatedBalance)
      } else {
        const updatedBalance = await balancesController.updateEgreso(
          operacion.operacionMonto,
          operacion.nucleoId
        )
        return res.status(200).send(updatedBalance)
      }
    } catch (error) {
		res.send(error)
	}
  }
}
