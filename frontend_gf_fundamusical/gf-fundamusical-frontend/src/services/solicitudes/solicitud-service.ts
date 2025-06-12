import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  userId: number;
  readonly SOLICITUDES_URL = "http://localhost:3128/api/periodo-SolicitudesList"
  solicitudes!: any[] 

  constructor(private http: HttpClient) {
	this.userId = 1; // dato quemado
   }


   getSolicitudes(periodId: number){
	return this.http.get<any>(`${this.SOLICITUDES_URL}/${periodId}`)
   }

}
