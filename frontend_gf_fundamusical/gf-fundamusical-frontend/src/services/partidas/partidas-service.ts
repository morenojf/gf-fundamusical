import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

	readonly GET_ALL_PARTIDAS_URL = "http://localhost:3128/api/get-partidas"
	readonly GET_ALL_PERIODO_PARTIDAS = "http://localhost:3128/api/get-periodo_partidas-table"
	readonly ATTACH_PARTIDAS_TO_PERIODO_URL = "http://localhost:3128/api/attach-partidas-to-periodo"

	
	constructor(private http: HttpClient) { }

	getAllPartidas(){
		return this.http.get<any>(this.GET_ALL_PARTIDAS_URL);
	}

	attachPartidasToPeriodo(periodoPartidasInfo: any){
		return this.http.post<any>(this.ATTACH_PARTIDAS_TO_PERIODO_URL, periodoPartidasInfo)
	}

	getPeriodoPartidasTable(){
		return this.http.get<any>(this.GET_ALL_PERIODO_PARTIDAS)
	}

}
