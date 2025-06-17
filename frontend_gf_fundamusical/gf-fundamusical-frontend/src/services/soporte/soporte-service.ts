import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SoporteService {
  constructor(private http: HttpClient) {}

  // URL
  readonly SOPORTE_URL =
    'http://localhost:3128/api/periodo/solicitud-soporte/:id';
  // Recibe:  {FacturaURL: string", CartaPyRURL: string, "MontoFactura": 1687.20, "TipoMoneda": 2}


//   attachedSoporteSolicitud(){
// 	this.http.post(`${this.SOPORTE_URL}/${solicitudId}`, {soporteData})
//   }

//   getSoporteBySolicitudId(){
// 	this.http.get<any[]>(`${this.SOPORTE_URL}/${solicitudId}`)
//   }
}
