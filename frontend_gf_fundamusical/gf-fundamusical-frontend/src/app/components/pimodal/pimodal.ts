import {
	ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../DIrectives/close-modal.directive';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';
import PiObject from '../../Models/PiObject';
import { PiService } from '../../../services/pi-design/pi-service';

@Component({
  selector: 'app-pimodal',
  imports: [closeModalDirective, ReactiveFormsModule, FormsModule],
  templateUrl: './pimodal.html',
  styleUrl: './pimodal.css',
})
export class PImodal implements OnInit {

id!: number;
resultGetSC!: any;

  constructor(public servicePi: PiService, private cdr: ChangeDetectorRef) {
	  this.id = 1

	// planInversion ID para encontrar subcategorias
  }

  ngOnInit(): void {


  }

  genTrigger(){
	this.getSC();
	this.getPC();
	this.openDialog();
  }

  onPlanCuentaChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedId = Number(selectElement.value);
  this.id = selectedId; // Cambias la variable por el valor seleccionado
  this.getSC(); // Llamas a la función que hace la petición
}

// OBTENER SUBCARTEGORIAS SEGUN PC ID SELECTED
getSC() {
this.servicePi.getInfoSC(this.id).subscribe({
  next: (data) => {
	this.servicePi.subCategorias = data
	console.log(Array.isArray(this.servicePi.subCategorias)); // Debe ser true
	console.log('te muestro lo que se guarda en la variable de SC', this.servicePi.subCategorias)
	this.cdr.detectChanges();
},
  error: (e) => {
	if (e){	
		console.log('No existen Subcategorias para este plan de inversión: error: ',e);
		this.servicePi.subCategorias = []
		// Se hace un array vacio para mostrarlo en el html
	}
  },
});
}

// OBTENER PLANES DE CUENTA DISPONIBLES

  getPC() {
    this.servicePi.getInfoPC().subscribe({
      next: (data) => {
		this.servicePi.planesCuenta = data
	  },
      error: (e) => {
        console.log(e);
      },
    });
  }


  // MODAL --------------------------------------------------------------

  dialogService = inject(ModalService);

  template = viewChild(TemplateRef);

  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  openDialog() {
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }

  // --------------------------------------------------------------------
}
