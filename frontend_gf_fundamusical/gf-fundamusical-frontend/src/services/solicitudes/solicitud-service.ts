import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Solicitud from '../../app/Models/SolicitudModel';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  readonly SOLICITUDES_URL =
    'http://localhost:3128/api/periodo-SolicitudesList';
  readonly PCNAME_URL = 'http://localhost:3128/api/periodo/solicitud-pc';
  userId: number;
  solicitudes!: Solicitud[];

  constructor(private http: HttpClient) {
    this.userId = 1; // dato quemado
  }

  getSolicitudes(periodId: number) {
    return this.http.get<Solicitud[]>(`${this.SOLICITUDES_URL}/${periodId}`);
  }


  // Obtener los nombres de las PC correspondientes a cada solicitud
  getPCnameByPIPCid(PIPCid: number) {
    return this.http.get<any[]>(
      `${this.PCNAME_URL}/${PIPCid}`
    );
  }
}
