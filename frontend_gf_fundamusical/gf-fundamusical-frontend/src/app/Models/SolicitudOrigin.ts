import ArticuloModel from "./articuloModel"

  export default interface Solicitud {
    solicitudId: number,
    userId: number,
    periodoId: number,
    planInversionPlanCuentaId: number,
    solicitudMotivo: string,
    solicitudStatus: number,
    solicitudCreatedAt: Date,
	planCuentaName?: string,
	articulosSolicitud?: ArticuloModel[]
  }

  // solicitud.solicitudActualData.