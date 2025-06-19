import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Solicitud from '../../app/Models/SolicitudOrigin';
import MotivosAnulacion from '../../app/Models/motivosAnulacion';
import PCbyPI from '../../app/Models/PCbyPI';

@Injectable({
	providedIn: 'root',
})
export class SolicitudService {
	// URLs
	readonly SOLICITUDES_URL =
		'http://localhost:3128/api/periodo-SolicitudesList';
	readonly PCNAME_URL = 'http://localhost:3128/api/periodo/solicitud-pc';
	readonly ANULAR_SOLICITUD_URL =
		'http://localhost:3128/api/periodo/solicitud-anular';
	readonly CHANGE_STATUS_URL =
		'http://localhost:3128/api/periodo/solicitud-statusChange';
	readonly GET_MOTIVOS_ANULACION_URL =
		'http://localhost:3128/api/periodo-anulaciones/solicitud-anular';
	readonly GET_PC_BY_PI = 'http://localhost:3128/api/periodo/solicitud'
	readonly CREATE_SOLICITUD_URL = 'http://localhost:3128/api/periodo/solicitud-crearsolicitud'
	readonly USER_SOLICITUDES_URL = 'http://localhost:3128/api/dashboard/user-solicitudes'

	// VARIABLES
	userId: number;
	solicitudes!: Solicitud[];
	constructor(private http: HttpClient) {
		this.userId = 1; // dato quemado
		this.solicitudes = []
	}

	// Obtener all solicitudes segun user ID
	getSolicitudesByUserID(){
		return this.http.get<Solicitud[]>(`${this.USER_SOLICITUDES_URL}/${this.userId}`)
	}

	// Obtener solicitudes segun el periodo ID 
	getSolicitudes(periodId: number) {
		return this.http.get<Solicitud[]>(`${this.SOLICITUDES_URL}/${periodId}`);
	}

	// Obtener los nombres de las PC correspondientes a cada solicitud
	getPCnameByPIPCid(PIPCid: number) {
		return this.http.get<any[]>(`${this.PCNAME_URL}/${PIPCid}`);
	}

	// Crear motivo de Anulacion de solicitud
	anularSolicitud(solicitudId: number, motivoAnulacion: string) {
		return this.http.post(`${this.ANULAR_SOLICITUD_URL}/${solicitudId}`, {
			motivoAnulacion,
		});
	}

	// Cambiar estado de solicitud a anulado
	statusChange(solicitudId: number, newStatus: number) {
		return this.http.patch(
			`${this.CHANGE_STATUS_URL}/${solicitudId}`,
			{ newStatus }
		);
	}

	// Obtener todos los motivos de anulacion existentes
	getMotivosAnulacion() {
		return this.http.get<MotivosAnulacion[]>(this.GET_MOTIVOS_ANULACION_URL);
	}

	// Obtener el nombre de un plan de cuenta segun el ID del plan de inversion
	getPCnameByPIid(PIid: number | undefined) {
		return this.http.get<PCbyPI[]>(`${this.GET_PC_BY_PI}/${PIid}`)
	}

	// Crear solicitudes
	createSolicitud(desginedSolcitud: any){
		return this.http.post<any>(this.CREATE_SOLICITUD_URL, desginedSolcitud)
	}
}
