import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { error } from 'highcharts';
import { OperacionesService } from '../../../services/operaciones/operaciones-service';
import { UserService } from '../../../services/user-services/user-service';

@Component({
  selector: 'app-stats',
  imports: [ CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats implements OnInit{

	// obtener información del usuario para saber a que nucleo pertenece
	userInfo!: any;

	// obtener el nucleo según el usuario que se loguea
	nucleoInfo!: any;

	// datos almacenados en el local storage cuando entras como admin 
	selectedNucleo!: any;

	// Todos los arrays estan filtrados siempre por el nucleoID actualmente logueado

	// Cantidad de operaciones total
	operacionesArray!: any;
	// Cantidad de operaciones ingreso
	operacionesIngreso!: any;
	// Cantidad de operaciones egreso
	operacionesEgreso!: any;

	// Constructor
	constructor( route: ActivatedRoute, public operacionService: OperacionesService, public userService: UserService, public nucleoService: ServicioVG){
		this.getUserInfo()
	}

	ngOnInit(): void {
	}

	// Obtengo el nucleo id del usuario logueado
	getUserInfo(){
		this.userService.validateSession().subscribe({
			next: (data) => {
				this.userInfo = data.data
				if (this.userInfo.userRol === 'ADMIN') {
					this.obtenerDato()
				} else {
					this.getNucleoInfo(this.userInfo)
				}
			},
			error: (error) => {
				console.log(error)
			}
		})
	}

	// Si soy admin obtengo mis datos del LS para ver la informacion del usuario
	  obtenerDato(): void {
    const datoJSON = localStorage.getItem('nucleoInfo');
    if (datoJSON) {
      this.selectedNucleo = JSON.parse(datoJSON);
	  this.getAllOperaciones(this.selectedNucleo)
	  this.nucleoInfo = this.selectedNucleo
    } else {
      this.selectedNucleo = null;
      console.log('no hay datos almacenados con esa clave');
    }
  }


	// Obtengo toda la información del nucleo según el nucleoId del usuario
	getNucleoInfo(userInfo: any){
		this.nucleoService.getAllNucleos().subscribe({
			next: (data) =>{
				this.nucleoInfo = data.find((nucleo: any) => nucleo.nucleoId === userInfo.nucleoId)
				this.getAllOperaciones(this.nucleoInfo)
			},
			error: (error) => {
				console.log(error)
			}
		})
	}

	// Obtengo las operaciones que corresponden al nucleo cargado
	getAllOperaciones(nucleoInfo: any){
		this.operacionService.getAllOperaciones().subscribe({
			next: (data) =>{
				this.operacionesArray = data.filter((operacion: any) => operacion.nucleoId == nucleoInfo.nucleoId)
				this.operacionesIngreso = data.filter((operacion: any) => operacion.nucleoId == nucleoInfo.nucleoId && operacion.operacionTipo === "INGRESO")
				this.operacionesEgreso = data.filter((operacion: any) => operacion.nucleoId == nucleoInfo.nucleoId && operacion.operacionTipo === "EGRESO")


			},
			error: (error) =>{
				console.log(error)
			}
		})
	}
}
