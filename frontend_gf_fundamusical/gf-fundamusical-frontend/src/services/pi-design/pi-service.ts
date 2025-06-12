import { Injectable } from '@angular/core';
// FUNCIONAMIENTO DE HTTP
import { HttpClient } from '@angular/common/http';
import PlanCuenta from '../../app/Models/PCModel';
import SubCategoria from '../../app/Models/subCategorias';
import PiObject from '../../app/Models/PiObject';

@Injectable({
  providedIn: 'root',
})
export class PiService {
  readonly SC_URL =
    'http://localhost:3128/api/gestion/modal/plancuenta-subcategoria'; //OBTIENE SC EN BASE A ID PLANES DE CUENTA
  readonly API_URL = 'http://localhost:3128/api/gestion-modal'; // OBTIENE TODOS LOS PLANES DE CUENTA DISPONIBLES PARA SELECCIONAR

  readonly CREATEPI_URL = 'http://localhost:3128/api/gestion-modal';
  
  readonly DESIGNPI_URL = 'http://localhost:3128/api/gestion/modal/plan-inversion'

  planesCuenta!: PlanCuenta[];
  subCategorias!: SubCategoria[] | null;
  newPI!: any[];
  userId: number;

  planInversionId!: number;

  designedPi!: PiObject[];

  constructor(private http: HttpClient) {
    this.userId = 1;
  }

  getInfoPC() {
    return this.http.get<PlanCuenta[]>(this.API_URL);
  }

  getInfoSC(id: number) {
    return this.http.get<SubCategoria[]>(`${this.SC_URL}/${id}`);
  }

  newPeriodPI() {
    return this.http.post<any[]>(this.CREATEPI_URL, { userId: this.userId });
  }

  PiDesign() {
    return this.http.post<any>(this.DESIGNPI_URL, this.designedPi);
  }
}
