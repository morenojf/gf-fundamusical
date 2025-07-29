// ESTE COMPONENTE ES UN MANEJADOR QUE RECIBE LAS OPERACIONES, SE COMUNICA CON EL MODELO DE NUCLEO Y MODIFICA LOS SALDOS DE LOS NUCLEOS EN BASE AL TIPO DE OPERACION

import { nucleoModel } from '../../nucleo/model/nucleoModel.mjs'

export class balancesController {
  // Ajusta los egresos y el balance de nucleo cuando se registra una operacion de tipo egreso
  static async adjustEgreso(montoEgreso, nucleoId) {
    try {
      const nucleoInfo = await nucleoModel.getNucleoByNucleoId(nucleoId)

      // nuevo saldo es typeOfNumber
      const nuevoSaldo =
        parseFloat(nucleoInfo.nucleoSaldo) - parseFloat(montoEgreso)

      // nuevo egreso es TyPeOf
      const nuevoEgreso =
        parseFloat(nucleoInfo.nucleoEgresos) + parseFloat(montoEgreso)

      // restar y actualizar el balance total del nucleo
      const updatedNucleoBalance = await nucleoModel.updateNucleoBalance(
        nuevoSaldo,
        nucleoId
      )

      // sumar a los egresos totales
      const updatedNucleoEgresos = await nucleoModel.addToEgresos(
        nuevoEgreso,
        nucleoId
      )
      return updatedNucleoBalance, updatedNucleoEgresos
    } catch (error) {
      return error
    }
  }

  // Ajusta los ingresos y el balance de nucleo cuando se registra una operacion de tipo ingreso
  static async adjustIngreso(montoIngreso, nucleoId) {
    try {
      const nucleoInfo = await nucleoModel.getNucleoByNucleoId(nucleoId)
      const nuevoSaldo =
        parseFloat(nucleoInfo.nucleoSaldo) + parseFloat(montoIngreso)
      const nuevoIngreso =
        parseFloat(nucleoInfo.nucleoIngresos) + parseFloat(montoIngreso)

      // sumar y actualizar el balance total del nucleo, escribir en la DB
      const updatedNucleoBalance = await nucleoModel.updateNucleoBalance(
        nuevoSaldo,
        nucleoId
      )

      // Actualizar los ingresos totales, escribir en la DB
      const updatedNucleoIngresos = await nucleoModel.addToIngresos(
        nuevoIngreso,
        nucleoId
      )
      return updatedNucleoBalance, updatedNucleoIngresos
    } catch (error) {
      return error
    }
  }

  // Ajusta los egresos y el balance de nucleo cuando se elimina una operacion de tipo egreso
  static async updateEgreso(montoEgreso, nucleoId) {
    try {
      const nucleoInfo = await nucleoModel.getNucleoByNucleoId(nucleoId)

      // nuevo saldo es typeOfNumber
      const nuevoSaldo =
        parseFloat(nucleoInfo.nucleoSaldo) + parseFloat(montoEgreso)

      // nuevo egreso es TyPeOf
      const updateEgreso =
        parseFloat(nucleoInfo.nucleoEgresos) - parseFloat(montoEgreso)

      // restar y actualizar el balance total del nucleo
      const updatedNucleoBalance = await nucleoModel.updateNucleoBalance(
        nuevoSaldo,
        nucleoId
      )

      // sumar a los egresos totales
      const updatedNucleoEgresos = await nucleoModel.addToEgresos(
        updateEgreso,
        nucleoId
      )
      return updatedNucleoBalance, updatedNucleoEgresos
    } catch (error) {
      return error
    }
  }

  // Ajusta los ingresos y el balance de nucleo cuando se elimina una operacion de tipo ingreso
  static async updateIngreso(montoIngreso, nucleoId) {
    try {
      const nucleoInfo = await nucleoModel.getNucleoByNucleoId(nucleoId)

      // nuevo saldo es typeOfNumber
      const nuevoSaldo =
        parseFloat(nucleoInfo.nucleoSaldo) - parseFloat(montoIngreso)

      // nuevo egreso es TyPeOf
      const updateIngreso =
        parseFloat(nucleoInfo.nucleoIngresos) - parseFloat(montoIngreso)

      // restar y actualizar el balance total del nucleo
      const updatedNucleoBalance = await nucleoModel.updateNucleoBalance(
        nuevoSaldo,
        nucleoId
      )

      // sumar a los egresos totales
      const updatedNucleoIngresos = await nucleoModel.addToIngresos(
        updateIngreso,
        nucleoId
      )
      return updatedNucleoBalance, updatedNucleoIngresos
    } catch (error) {
      return error
    }
  }
}
