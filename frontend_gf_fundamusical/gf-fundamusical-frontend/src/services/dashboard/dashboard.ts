import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DashboardModel from '../../app/Models/dashboard';


@Injectable({
	providedIn: 'root',
})
export class DashboardService {

readonly GET_DASHBOARD_URL= 'http://localhost:3128/api/dashboard';

  constructor(private http: HttpClient) { }


  getDashboard(userId: number){
	return this.http.get<DashboardModel>(`${this.GET_DASHBOARD_URL}/${userId}`)
  }
}
