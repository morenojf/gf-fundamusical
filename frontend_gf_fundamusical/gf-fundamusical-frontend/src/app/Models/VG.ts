import NucleoModel from "./nucleo";
import Periodos from "./periodos";
import Planes from "./Planes";

export default interface VistaGestion {
	nucleoInfo: NucleoModel[],
	planes: Planes[],
	periodos: Periodos[]
}