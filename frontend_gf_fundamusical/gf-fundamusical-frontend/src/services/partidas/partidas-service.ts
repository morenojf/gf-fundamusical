import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartidasService {
  readonly GET_ALL_PARTIDAS_URL = 'http://localhost:3128/api/get-partidas';
  readonly GET_ALL_PERIODO_PARTIDAS =
    'http://localhost:3128/api/get-periodo_partidas-table';
  readonly ATTACH_PARTIDAS_TO_PERIODO_URL =
    'http://localhost:3128/api/attach-partidas-to-periodo';
  readonly CREATE_PARTIDA_URL = 'http://localhost:3128/api/create-partida';
  readonly UPDATE_PARTIDA_URL = 'http://localhost:3128/api/update-partida';
  readonly DEACTIVATE_PARTIDA_URL = 'http://localhost:3128/api/deactivate-partida';
  readonly ACTIVATE_PARTIDA_URL = 'http://localhost:3128/api/activate-partida';

  constructor(private http: HttpClient) {}

  getAllPartidas() {
    return this.http.get<any>(this.GET_ALL_PARTIDAS_URL);
  }

  attachPartidasToPeriodo(periodoPartidasInfo: any) {
    return this.http.post<any>(
      this.ATTACH_PARTIDAS_TO_PERIODO_URL,
      periodoPartidasInfo
    );
  }

  getPeriodoPartidasTable() {
    return this.http.get<any>(this.GET_ALL_PERIODO_PARTIDAS);
  }

  createPartida(newPartida: any) {
    return this.http.post<any>(this.CREATE_PARTIDA_URL, newPartida);
  }

  updatePartida(partida: any) {
    return this.http.patch<any>(this.UPDATE_PARTIDA_URL, partida);
  }

  deactivatePartida(partida: any) {
    return this.http.patch<any>(this.DEACTIVATE_PARTIDA_URL, partida);
  }

  activatePartida(partida: any) {
    return this.http.patch<any>(this.ACTIVATE_PARTIDA_URL, partida);
  }
}
