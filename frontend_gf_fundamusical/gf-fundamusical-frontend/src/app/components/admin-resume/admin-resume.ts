import { Component, signal, WritableSignal } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { Router } from '@angular/router';
import { count } from 'rxjs';

@Component({
	selector: 'app-admin-resume',
	imports: [],
	templateUrl: './admin-resume.html',
	styleUrl: './admin-resume.css',
})
export class AdminResume {
	nucleosInfo!: any;
	selectedNucleo!: any;

	constructor(public nucleoService: ServicioVG, public router: Router) {
		this.getAllNucleos();
		this.obtenerDato();
	}

	// Capturar el id de usuario relacionado al nucleo del cual se quieren obtener detalles.
	goToNucleoDetails(nucleo: any) {
		this.router.navigate(['dashboard/', nucleo.userId])
		localStorage.setItem('nucleoInfo', JSON.stringify(nucleo))

	}

	obtenerDato():void {
		const datoJSON = localStorage.getItem('nucleoInfo')
		if (datoJSON) {
			this.selectedNucleo = JSON.parse(datoJSON)
			console.log('Dato obtenido del LS', this.selectedNucleo)
		} else{
			this.selectedNucleo = null
			console.log('no hay datos almacenados con esa clave')
		}
	}

	getAllNucleos() {
		this.nucleoService.getAllNucleos().subscribe({
			next: (data) => {
				this.nucleosInfo = data;
				console.log();
			},
			error: (error) => {
				console.log(error);
			},
		});
	}
}
