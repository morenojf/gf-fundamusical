import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  // URL
  readonly RESOURCES_URL =
    'http://localhost:3128/api/get-resources';
  // {"files": ["FORMATOS MANUAL DE NORMAS PARA RENDICIONES .docx", "plan de inversiones NAY_2025_01_30 .pdf"], "path": "C:\\Users\\fjmor\\OneDrive\\Documentos\\Francisco\\Universidad\\TAREAS\\10mo semestre\\TRABAJO\\APIREST GESTION FINANCIERA FUNDAMUSICAL\\backend_gf_fundamusical\\public\\modelosCartas"}


  getResources(){
	return this.http.get<any>(this.RESOURCES_URL)
  }
}
