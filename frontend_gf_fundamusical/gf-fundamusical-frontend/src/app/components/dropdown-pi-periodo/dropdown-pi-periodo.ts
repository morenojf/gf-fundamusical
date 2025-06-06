import { Component, OnInit } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import Planes from '../../Models/Planes';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown-pi-periodo',
  imports: [NgClass],
  templateUrl: './dropdown-pi-periodo.html',
  styleUrl: './dropdown-pi-periodo.css',
})
export class DropdownPIPeriodo implements OnInit {
  // Variable para controlar qué tarjeta del acordeón está activa

  currentYear: number;
  id: number;

  // Acordeon
  activeAccordion: string | null = '2025'; // '2025' para que inicie abierta, o null para iniciar todos cerrados

  acoordionCard!: any;
  acoordionHeader!: any;

  constructor(public servicioVG: ServicioVG) {

	this.id = 1

    this.currentYear = new Date().getFullYear();
    this.getInfo();
  }

  ngOnInit(): any {}

  // LOGICA ACORDEON
  // AL HACER CLICK EN HEADER
  // Quitar clase activo de todos los bloques
  // Aniadir clase active al bloque con la posicion del header
  acordionFunc(plan: Planes, planInversionId: number) {
	this.servicioVG.listaPlanes.forEach(elemento => {
		if (elemento.planInversionId !== plan.planInversionId) {
			elemento.isActive = false;

			// cierra los acordeones distintos al seleccionado
		}
	});

	plan.isActive = !plan.isActive
	const activeId = plan.isActive ?  planInversionId: null;

	console.log('estoy pasando este id', planInversionId)

	this.id = planInversionId;
	this.getInfo(activeId !== null ? activeId: undefined);

  }

  getInfo(activeId?: number) {
    this.servicioVG.getInfoVG(this.id).subscribe({
      next: (data) => {
        // Envio data completa original de VG
        this.servicioVG.vistaGestionObject = data;

        // Envio data lista de Planes aniadiendo propiedad isActive como false
        this.servicioVG.listaPlanes = data.planes.map<Planes>((item) => ({
          planInversionId: item.planInversionId,
          userId: item.userId,
          planCreatedAt: item.planCreatedAt,
          planAnio: item.planAnio,
          isActive: activeId === item.planInversionId,
        }));

        // Envio data lista Periodos
        this.servicioVG.listaPeriodos = data.periodos;

        // Tests de informacion
        console.log(
		  'esta esta en listaPlanes', 
		  this.servicioVG.listaPlanes
		);
        console.log(
          'esto está en listaPeriodos ',
          this.servicioVG.listaPeriodos
        );
        console.log(
          'esto está en vistaGestion ',
          this.servicioVG.vistaGestionObject
        );
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
} // FINAL DE CLASE
