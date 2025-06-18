export default interface Soporte {
  soporteId: number,
  referenciaOperacion: string,
  solicitudId: number,
  soporteInvoice: string, //ruta de acceso al archivo
  soporteLetter: string, //ruta de acceso al archivo
  soporteMont: number,
  soporteMoneda: number,
  soporteCreatedAt: number // Pueden ser dos valores 1 = BS (Bolívares), 2 = USD (Dólares).
}
