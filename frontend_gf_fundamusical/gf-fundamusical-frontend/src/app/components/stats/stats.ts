import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../../pages/Dashboard/dashboard';
import { ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from '../../../services/dashboard/dashboard';
import DashboardModel from '../../Models/dashboard';
import { Chart } from '../chart/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [Chart, CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats implements OnInit{

	userId: number;
	dashboardInfo: DashboardModel;

	// Constructor
	constructor(public dashboardService: DashboardService, route: ActivatedRoute){
		this.userId = route.snapshot.params['id']
		this.dashboardInfo = {
			nucleoInfo: [],
			totalActivas: 0,
			totalAnuladas: 0,
			totalFinalizadas: 0,
			totalSolicitudes: 0
		}
	}


	// OnInit
	ngOnInit(): void {
		this.getDashboard()
	}

	getDashboard(){
		this.dashboardService.getDashboard(this.userId).subscribe({
			next: (data) => {
				// data retorna un objeto
				this.dashboardInfo = data
			},
			error: (err) => {
				console.log('Olims', err)
			}
		})
	}

}
