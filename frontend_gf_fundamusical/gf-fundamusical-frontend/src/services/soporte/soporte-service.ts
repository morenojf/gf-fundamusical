import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Soporte from '../../app/Models/soporteModel';

@Injectable({
  providedIn: 'root',
})
export class SoporteService {
  constructor(private http: HttpClient) {}

  // URL
  readonly SOPORTE_URL =
    'http://localhost:3128/api/periodo/solicitud-soporte';
  // Recibe:  {FacturaURL: string", CartaPyRURL: string, "MontoFactura": 1687.20, "TipoMoneda": 2}


  attachedSoporteSolicitud(solicitudId: number, soporteData: FormData) {
	return this.http.post<any>(`${this.SOPORTE_URL}/${solicitudId}`, soporteData)
  }

  getSoportesInfo(){
	return this.http.get<Soporte[]>(this.SOPORTE_URL)
  }
}
