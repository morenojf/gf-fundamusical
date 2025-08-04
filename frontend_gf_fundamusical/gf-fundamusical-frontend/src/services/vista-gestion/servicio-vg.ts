import { Injectable } from '@angular/core';
// FUNCIONAMIENTO DE HTTP
import { HttpClient } from '@angular/common/http';
import VistaGestion from '../../app/Models/VG';
import Periodos from '../../app/Models/periodos';
import Planes from '../../app/Models/PlanesInversion';
import NucleoModel from '../../app/Models/nucleo';

@Injectable({
  providedIn: 'root'
})
export class ServicioVG {

	readonly API_URL = "http://localhost:3128/api/gestion"
	readonly PERIODO_INFO_URL = "http://localhost:3128/api/periodo"
	readonly NUCLEOS_INFO_URL = "http://localhost:3128/api/nucleos-info" // URL para que el adminastrador pueda tener la información de todos los nucleos
	readonly NUCLEO_INFO_BY_USER_ID = "http://localhost:3128/api/nucleo-by-user-id" // Obtener información del nucleo segun el usuario en sesion
	readonly CREATE_NUCLEO_URL = "http://localhost:3128/api/create-nucleo" // Crear un nuevo nucleo enviando solo el nombre en el cuerpo
	readonly UPDATE_NUCLEO_URL = "http://localhost:3128/api/update-nucleo" // Editar nombre del nucleo
	readonly GET_NUCLEO_USUARIO = "http://localhost:3128/api/get-nucleo-usuario" // Obtener los nucleos ya relacionados a un usuario para poder comparar


	vistaGestionObject!:VistaGestion;
	listaPeriodos!: Periodos [];
	listaPlanes!: Planes[];
	nucleoInfo!: NucleoModel;


  constructor(private http: HttpClient) {
	this.listaPlanes = []
	this.listaPeriodos = []
  }

  getInfoVG(id: number) {
	return this.http.get<VistaGestion>(`${this.API_URL}/${id}`)
  }

  getPeriodoInfo(periodoId: number) {
	return this.http.get<Periodos>(`${this.PERIODO_INFO_URL}/${periodoId}`)
  }

  getAllNucleos() {
	return this.http.get<any>(this.NUCLEOS_INFO_URL)
  }

  getNucleoInfoByUserId(userId: number){
	return this.http.get<any>(`${this.NUCLEO_INFO_BY_USER_ID}/${userId}`)
  }


  createNucleo(nucleoName: any){
	return this.http.post<any>(this.CREATE_NUCLEO_URL, nucleoName)
  }

  updateNucleo(nucleo: any){
	return this.http.patch<any>(this.UPDATE_NUCLEO_URL, nucleo)
  }

  getUsuarioNucleo(){
	return this.http.get<any>(this.GET_NUCLEO_USUARIO)
  }
}
