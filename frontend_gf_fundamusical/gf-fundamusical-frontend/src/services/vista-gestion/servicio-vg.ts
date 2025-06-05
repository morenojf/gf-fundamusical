import { Injectable } from '@angular/core';
// FUNCIONAMIENTO DE HTTP
import { HttpClient } from '@angular/common/http';
import VistaGestion from '../../app/Models/VG';
import Periodos from '../../app/Models/periodos';

@Injectable({
  providedIn: 'root'
})
export class ServicioVG {

	readonly API_URL = "http://localhost:3128/api/gestion"
	vistaGestionObject!:VistaGestion;
	listaPeriodos!: Periodos [];


  constructor(private http: HttpClient) {

  }

  getInfoVG(id: number) {
	return this.http.get<VistaGestion>(`${this.API_URL}/${id}`)
  }

}
