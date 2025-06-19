import { Component, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import Planes from '../../Models/PlanesInversion';
import { NgClass } from '@angular/common';
import { PImodal } from '../pimodal/pimodal';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown-pi-periodo',
  imports: [NgClass, PImodal, RouterLink, RouterModule],
  templateUrl: './dropdown-pi-periodo.html',
  styleUrl: './dropdown-pi-periodo.css',
})
export class DropdownPIPeriodo implements OnInit {

  currentYear: number;
  id: number;

  // ACORDEON
  acoordionCard!: any;
  acoordionHeader!: any;
  

  // CONSTRUCTOR
  constructor(public servicioVG: ServicioVG) {  //, public modalComponent: PImodal

	this.id = 1
	
    this.currentYear = new Date().getFullYear();
    this.getInfo();
  }


  // OnInit
  ngOnInit(): any {
  }

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
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
} // FINAL DE CLASE
