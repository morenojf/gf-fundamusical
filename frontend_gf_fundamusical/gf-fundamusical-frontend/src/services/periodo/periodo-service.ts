import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {


  readonly CREATE_PERIODO_URL = 'http://localhost:3128/api/create-periodo';
  readonly GET_ALL_PERIODOS_URL = 'http://localhost:3128/api/get-periodos'

  constructor(private http: HttpClient) {}

  getAllPeriodos(){
	return this.http.get<any>(this.GET_ALL_PERIODOS_URL);
  }

  createPeriodo(periodoFormValue: any) {
    return this.http.post<any>(this.CREATE_PERIODO_URL, periodoFormValue);
  }
}
