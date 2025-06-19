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

}
