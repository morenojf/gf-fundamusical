// Estos datos se envian al backend para agregar soportes a las solicitudes

export default interface SoporteSent {
  monto: number, //ruta de acceso al archivo
  referenciaOperacion: string, //ruta de acceso al archivo
  rutaCartaPyR: File,
  rutaFactura: File, // Pueden ser dos valores 1 = BS (Bolívares), 2 = USD (Dólares).
  tipoMoneda: number
}
