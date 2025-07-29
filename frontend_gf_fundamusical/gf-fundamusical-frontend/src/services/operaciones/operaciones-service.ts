import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
  readonly POST_OPERACION_URL = 'http://localhost:3128/api/post-operacion';
  readonly GET_ALL_OPERACIONES_URL = "http://localhost:3128/api/get-all-operaciones"
  readonly DELETE_OPERACION_URL = "http://localhost:3128/api/delete-operacion"
  readonly UPDATE_NUCLEO_BALANCE = "http://localhost:3128/api/update-balance"

  constructor(private http: HttpClient) {}

  getAllOperaciones(){
	return this.http.get<any>(this.GET_ALL_OPERACIONES_URL)
  }

  createOperacion(operacionData: any) {
    return this.http.post<any>(this.POST_OPERACION_URL, operacionData);
  }

  deleteOperacion(operacionId: any){
	return this.http.delete<any>(`${this.DELETE_OPERACION_URL}/${operacionId}`)
  }

  updateNucleoBalance(operacion: any){
	return this.http.patch<any>(this.UPDATE_NUCLEO_BALANCE, operacion)
  }
}
