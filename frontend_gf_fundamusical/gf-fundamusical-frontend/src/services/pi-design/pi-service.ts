import { Injectable } from '@angular/core';
// FUNCIONAMIENTO DE HTTP
import { HttpClient } from '@angular/common/http';
import PlanCuenta from '../../app/Models/PCModel';
import SubCategoria from '../../app/Models/subCategorias';

@Injectable({
  providedIn: 'root',
})
export class PiService {
  readonly SC_URL =
    'http://localhost:3128/api/gestion/modal/plancuenta-subcategoria';
  readonly API_URL = 'http://localhost:3128/api/gestion-modal'; // OBTIENE TODOS LOS PLANES DE CUENTA DISPONIBLES PARA SELECCIONAR
  planesCuenta!: PlanCuenta[];
  subCategorias!: SubCategoria[] | null;

  constructor(private http: HttpClient) {}

  getInfoPC() {
    return this.http.get<PlanCuenta[]>(this.API_URL);
  }

  getInfoSC(id: number) {
    return this.http.get<SubCategoria[]>(`${this.SC_URL}/${id}`);
  }
}
