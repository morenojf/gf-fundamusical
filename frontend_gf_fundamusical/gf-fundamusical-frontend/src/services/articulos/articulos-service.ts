import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
	readonly ARTICULOS_POST_URL = 'http://localhost:3128/api/periodo/solicitud-addArticle'


    constructor(private http: HttpClient) { }



    postArticles(solicitudId: number, articulosList: any[]) {
    return this.http.post<any>(`${this.ARTICULOS_POST_URL}/${solicitudId}`, articulosList);
  }
}


