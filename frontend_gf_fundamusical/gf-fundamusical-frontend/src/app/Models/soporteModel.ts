export default interface Soporte {
  FacturaURL: string; //ruta de acceso al archivo
  CartaPyRURL: string; //ruta de acceso al archivo
  MontoFactura: number;
  TipoMoneda: 2; // Pueden ser dos valores 1 = BS (Bolívares), 2 = USD (Dólares).
}
