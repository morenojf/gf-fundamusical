import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  NgModule,
} from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import PiObject from '../../Models/PiObject';
import { PiService } from '../../../services/pi-design/pi-service';
import { find } from 'rxjs';
import SubCategoria from '../../Models/subCategorias';
import PlanCuenta from '../../Models/PCModel';

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
  // Declaracion array para guardar los id de PC seleccionados
  public pcValues: number[] = [];
  // Objeto a pushear en el array final
  public planRowObject: object = {};

  // Array de objetos para fetch al backend
  public designedPI: any[];

  // Subcatefields
  subcatName!: any[];

  // planCuentaFields
  planRowNames!: any[];

  // CONSTRUCTOR -----------------------------------------------------------

  constructor(public servicePi: PiService, private cdr: ChangeDetectorRef) {
    // planInversion ID por defecto para encontrar subcategorias
    this.id = 1;

    this.designedPI = [];

    this.subcatName = [];

    this.planRowNames = [];
  }

  // ON INIT ---------------------------------------------------------------
  ngOnInit(): void {
    this.selectedSC = new FormControl();
    this.selectedPC = new FormControl();

    this.formSC = new FormGroup({
      selectedId: this.selectedSC,
    });

    this.formPR = new FormGroup({
      selectedPC: this.selectedPC,
    });
  }

  public genTrigger() {
    this.getSC();
    this.getPC();
    this.openDialog();

    // Inicializar el formulario de SC con trigger --------
  }
  // FILTRADO DE SUBCATEGORIAS SEGUN SELECCION

  get filteredSubCategorias(): SubCategoria[] {
    if (!this.servicePi.subCategorias) return [];
    return this.servicePi.subCategorias.filter(
      (sc) => !this.scValues.includes(sc.subcategoriaId)
    );
  }

  // FILTRADO DE PLANES DE CUENTA SEGUN SELECIONADOS

  get filteredPC(): PlanCuenta[] {
    if (!this.servicePi.planesCuenta) return [];
    return this.servicePi.planesCuenta.filter(
      (sc) => !this.pcValues.includes(sc.planCuentaId)
    );
  }

  onPlanCuentaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);
    this.id = selectedId; // Cambias la variable por el valor seleccionado
    this.getSC(); // Llamas a la función que hace la petición
    // Reinicias los arrays de subcategorias para que no se mezclen
    this.subcatName = [];
    this.scValues = [];
  }

  // OBTENER SUBCARTEGORIAS SEGUN PC ID SELECTED
  getSC() {
    this.servicePi.getInfoSC(this.id).subscribe({
      next: (data) => {
        this.servicePi.subCategorias = data;
        this.cdr.detectChanges();
        // Asigna el primer valor solo si aún no hay uno seleccionado
        if (data.length > 0) {
          this.selectedSC.setValue(data[0].subcategoriaId);
        } else {
          this.selectedSC.setValue(null);
        }
      },
      error: (e) => {
        if (e) {
          console.log(
            'No existen Subcategorias para este plan de inversión: error: ',
            e
          );
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
      error: (e) => {
        console.log(e);
      },
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
      console.log('Aqui no pasarán valores nulos, pendejo');
      return;
    } else {
      console.log('este es el que se pushea', this.formSC.value);
      this.scValues.push(Number(this.formSC.value.selectedId));
      console.log('esto es lo que tienes dentro del array', this.scValues);

      // guardar el nombre de las subcategorias seleccionadas en base a los id porque antes solo se guardaban los id sin nombre
      const findName = this.servicePi.subCategorias?.find(
        (sc) => sc.subcategoriaId == this.formSC.value.selectedId
      )?.subcategoriaName;
      console.log(findName, 'esto hago con el find');
      // se pushea a un array de string para almacenar e iterar y mostrar los valores seleccionados en el template
      this.subcatName.push(findName);
    }
  }

  addPR(): void {
    console.log(
      'llegué hasta aqui y tome el siguiente valor del formulario para el plan de cuentas',
      this.formPR.value
    );
    this.pcValues.push(Number(this.formPR.value.selectedPC));
    this.planRowObject = {
      planCuentaId: Number(this.formPR.value.selectedPC),
      subcategoriasSeleccionadas: this.scValues,
    };

    console.log('asi es como va mi ojeto', this.planRowObject);

    this.designedPI.push(this.planRowObject);
    console.log(
      'asi es como va mi array de objetos para el post',
      this.designedPI
    );

    // Encntrar nombre plan de cuenta
    const findName = this.servicePi.planesCuenta?.find(
      (pc) => pc.planCuentaId == this.formPR.value.selectedPC
    )?.planCuentaName;
    const findCode = this.servicePi.planesCuenta?.find(
      (pc) => pc.planCuentaId == this.formPR.value.selectedPC
    )?.planCuentaCode;

    if (!this.subcatName.length) {
      const prUserObject = {
        nombrePlan: findName,
        codigoPlan: findCode,
        attachedSC: 'No se seleccionaron subcategorias para este elemento',
      };
      this.planRowNames.push(prUserObject);
    } else {
      const prUserObject = {
        nombrePlan: findName,
        codigoPlan: findCode,
        attachedSC: this.subcatName.join(', '),
      };
      this.planRowNames.push(prUserObject);
    }

    this.scValues = [];
    this.subcatName = [];
    return;
  }

  // --------------------------------------------------------------------
  designPI() {

	// crear nuevo PI period
    this.createPIPeriod();

	

  }


  // Llamada al servicio para crear un nuevo plan de inversion y un nuevo periodo
  createPIPeriod(){
    this.servicePi.newPeriodPI().subscribe({
      next: (data) => {
        // 	data returns [
        // 	{message: "Nuevo plan inversion creado", planInversionId: number},
        // 	{
		//  message: "Periodo Inicial creado", periodoId: 
		//  [{periodoAnio: 2025, periodoId: 1, periodoMes: 6, periodoStatus: "En Curso", planInversionId: 1}]
		//  }
        //  ]
		// Esto guarda el plan de inversion Id recientemente creado tipo number
		this.servicePi.planInversionId = data[0].planInversionId
		// PUSHEAR EL PLAN DE INVERSION ID A CADA OBJETO PARA COMPLETAR EL OBJETO Y PODER ENVIARLO AL BACKEND PARA DISENIAR EL NUEVO PI
		for (let index = 0; index < this.designedPI.length; index++) {
			this.designedPI[index] = {...this.designedPI[index], planInversionId: this.servicePi.planInversionId}	
		}
		this.servicePi.designedPi = this.designedPI
		// Ejecutamos la creacion del plan inversion diseniado
		this.sendFormInfo();
		window.location.reload();


      },
      error: (e) => {
        console.log('Error al crear el nuevo PI', e);
      },
    });

  }

  sendFormInfo(){
	this.servicePi.PiDesign().subscribe({
		next: (data) => {
			console.log(data) // returns message: 'Plan de Inversión creado satisfactoriamente'
		},
		error: (e) => {
			console.log(e)
		}
	})
  }

}
