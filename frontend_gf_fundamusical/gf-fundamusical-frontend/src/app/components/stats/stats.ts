import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { error } from 'highcharts';
import { OperacionesService } from '../../../services/operaciones/operaciones-service';

@Component({
  selector: 'app-stats',
  imports: [ CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats implements OnInit{

	userId: number;
	nucleoInfo!: any;


	// Todos los arrays estan filtrados siempre por el nucleoID actualmente logueado

	// Cantidad de operaciones total
	operacionesArray!: any;
	// Cantidad de operaciones ingreso
	operacionesIngreso!: any;
	// Cantidad de operaciones egreso
	operacionesEgreso!: any;

	// Constructor
	constructor(public vistaGestionService: ServicioVG, route: ActivatedRoute, public operacionService: OperacionesService){
		this.userId = route.snapshot.params['id']
		this.getNucleoInfo(this.userId)
	}

	ngOnInit(): void {

	}

	getNucleoInfo(userId: number){
		this.vistaGestionService.getNucleoInfoByUserId(userId).subscribe({
			next: (data) => {
				
				this.nucleoInfo = data
				this.getAllOperaciones(this.nucleoInfo.nucleoId)
			},
			error: (error) => {
				console.log(error)
			}
		})
	}

	getAllOperaciones(nucleoId: any){
		this.operacionService.getAllOperaciones().subscribe({
			next: (data) =>{

				this.operacionesArray = data.filter((operacion: any) => operacion.nucleoId == nucleoId)
				this.operacionesIngreso = data.filter((operacion: any) => operacion.nucleoId == nucleoId && operacion.operacionTipo === "INGRESO")
				this.operacionesEgreso = data.filter((operacion: any) => operacion.nucleoId == nucleoId && operacion.operacionTipo === "EGRESO")


			},
			error: (error) =>{
				console.log(error)
			}
		})
	}
}
