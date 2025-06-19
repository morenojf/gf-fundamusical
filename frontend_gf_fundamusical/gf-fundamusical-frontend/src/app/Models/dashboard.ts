import NucleoModel from "./nucleo"

export default interface DashboardModel {
	nucleoInfo: NucleoModel[],
	totalActivas: number,
	totalAnuladas: number,
	totalFinalizadas: number,
	totalSolicitudes: number
}

