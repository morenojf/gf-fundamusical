import { Component, OnInit } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import NucleoModel from '../../Models/nucleo';

@Component({
  selector: 'app-nucleo-info',
  imports: [],
  templateUrl: './nucleo-info.html',
  styleUrl: './nucleo-info.css'
})
export class NucleoInfo implements OnInit {

	id: number;

	constructor(public servicioVG: ServicioVG) {
		this.id = 1
	}

	ngOnInit(): void {
this.getNucleoInfo();
		
	}

getNucleoInfo(): void {
	this.servicioVG.getInfoVG(this.id).subscribe({
		next: (data) =>{
			this.servicioVG.nucleoInfo = data.nucleoInfo[0]
		},
		error(err) {
			console.log(err)
		},
	})
}

}



