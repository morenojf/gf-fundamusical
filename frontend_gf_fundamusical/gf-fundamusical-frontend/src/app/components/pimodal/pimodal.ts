import {
	ChangeDetectorRef,
	Component,
	inject,
	OnInit,
	TemplateRef,
	viewChild,
	ViewContainerRef,
	NgModule
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
	
	// Declaracion variable grupoFormulario SC
	public formSC!: FormGroup;
	// Campo del formulario
	public selectedSC!: FormControl;
	// Declaracion array para guardar los id de SC
	public scValues: number[] = []; 

	// Declaración variable grupoFormulario planRow
	public formPR!: FormGroup;
	// Campo formulario plan Cuenta
	public selectedPC!: FormControl;
	// Objeto a pushear en el array final
	public planRowObject: object = {}

	// Array de objetos para fetch al backend
	public designedPI: any[];

	// SubFields
	 

	
	// CONSTRUCTOR -----------------------------------------------------------

  constructor(public servicePi: PiService, private cdr: ChangeDetectorRef) {
	  // planInversion ID por defecto para encontrar subcategorias
	  this.id = 1

	  this.designedPI = [];

  }


  // ON INIT ---------------------------------------------------------------
  ngOnInit(): void {
	this.selectedSC = new FormControl()
	this.selectedPC = new FormControl()

	this.formSC = new FormGroup({
		selectedId: this.selectedSC
	});

	this.formPR = new FormGroup({
		selectedPC: this.selectedPC
	});

  }

  genTrigger(){
	this.getSC();
	this.getPC();
	this.openDialog();

	// Inicializar el formulario de SC con trigger --------


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
	this.cdr.detectChanges();
	// Asigna el primer valor solo si aún no hay uno seleccionado
    if (data.length > 0) {
        this.selectedSC.setValue(data[0].subcategoriaId);
      } else {
		this.selectedSC.setValue(null);
	  }
},
  error: (e) => {
	if (e){	
		console.log('No existen Subcategorias para este plan de inversión: error: ',e);
		this.servicePi.subCategorias = null;
		// Se hace un array vacio para mostrarlo en el html
		this.selectedSC.setValue(null);
	}
  },
});
}

// OBTENER PLANES DE CUENTA DISPONIBLES

  getPC() {
  this.servicePi.getInfoPC().subscribe({
    next: (data) => {
      this.servicePi.planesCuenta = data;
      // Asigna el primer valor solo si aún no hay uno seleccionado
      if (!this.selectedPC.value && data.length > 0) {
        this.selectedPC.setValue(data[0].planCuentaId);
      }
    },
    error: (e) => { console.log(e); }
  });
  }
  // --------------------------------------------------------------------

  // MODAL --------------------------------------------------------------

  dialogService = inject(ModalService);

  template = viewChild(TemplateRef);

  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  openDialog() {
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }

  // --------------------------------------------------------------------

  // FORM DATA ----------------------------------------------------------


  addSC(): void {
	if (this.formSC.value.selectedId === null) {
		console.log('Aqui no pasarán valores nulos, pendejo')
		return
	} else {
		console.log('este es el que se pushea', this.formSC.value)
		this.scValues.push(this.formSC.value.selectedId)
		console.log('esto es lo que tienes dentro del array', this.scValues)
	}
  };

  addPR(): void {
	console.log('llegué hasta aqui y tome el siguiente valor del formulario para el plan de cuentas', this.formPR.value)
	this.planRowObject = {planCuentaId: this.formPR.value.selectedPC, subcategorias: this.scValues}
	
	console.log('asi es como va mi ojeto', this.planRowObject)
	
	this.designedPI.push(this.planRowObject)
	console.log('asi es como va mi array de objetos para el post', this.designedPI)

	this.scValues = []
	return
  }



  // --------------------------------------------------------------------

}
