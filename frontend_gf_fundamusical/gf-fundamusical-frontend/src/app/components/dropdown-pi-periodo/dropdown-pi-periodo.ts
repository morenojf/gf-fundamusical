import { Component, OnInit } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import VistaGestion from '../../Models/VG';

@Component({
  selector: 'app-dropdown-pi-periodo',
  imports: [],
  templateUrl: './dropdown-pi-periodo.html',
  styleUrl: './dropdown-pi-periodo.css',
})
export class DropdownPIPeriodo implements OnInit {
  // Variable para controlar qué tarjeta del acordeón está activa
  activeAccordion: string | null = '2025'; // '2025' para que inicie abierta, o null para iniciar todos cerrados

  currentYear: number;
  id: number;


  constructor(public servicioVG: ServicioVG) {
    this.currentYear = new Date().getFullYear();
	this.id = 1;
	this.getInfo();
 }

  ngOnInit(): any {

  }

  getInfo(){
	this.servicioVG.getInfoVG(this.id).subscribe({
		next: (data) => {
			this.servicioVG.vistaGestionObject = data;
			this.servicioVG.listaPeriodos = data.periodos
			console.log('esto está en lista periodos ', this.servicioVG.listaPeriodos)
			console.log('esto está en vistaGestion ', this.servicioVG.vistaGestionObject)
		},
		error: (e) => {
			console.log(e)
		}
	})
  }


  


} // FINAL DE CLASE
