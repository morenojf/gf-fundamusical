import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PartidasService } from '../../../services/partidas/partidas-service';
import { PeriodoService } from '../../../services/periodo/periodo-service';
import { UserService } from '../../../services/user-services/user-service';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';

@Component({
  selector: 'app-aperturar-periodo',
  imports: [
    closeModalDirective,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './aperturar-periodo.html',
  styleUrl: './aperturar-periodo.css',
})
export class AperturarPeriodo implements OnInit {
  // Array de Partidas
  partidas!: any;

  // Loged In User ID
  userInfo!: any;

  // donde se almacena el Anio del perdio
  periodoAnio!: any;

  createdPeriodoId!: any;

  // Declaración variable grupoFormulario planRow
  public formPR!: FormGroup;
  // Campo formulario plan Cuenta
  public selectedPC!: FormControl;

  // Declaracion fullForm
  public fullForm!: FormGroup;
  // Campo formulario Anio
   selectedYear!: FormControl;

  // Declaracion array para guardar los id de partidas seleccionadas
  public partidasValues: number[] = [];
  // Objeto a pushear en el array final
  public planRowObject: object = {};

  // Array de objetos para fetch al backend
  public designedPI: any[];

  // planCuentaFields
  planRowNames!: any[];

  // año
  anioActual: any;
  anioInicial: any;
  anioList: any;

  // CONSTRUCTOR -----------------------------------------------------------

  constructor(
    public partidasService: PartidasService,
    public periodoService: PeriodoService,
    public userService: UserService,
    public nucleoInfo: ServicioVG // servicio VG obtiene la información del nucleo
  ) {
    //año actual
    this.anioActual = new Date().getFullYear();
    // año inicial
    this.anioInicial = 2000;
    // anio Options
    this.anioList = [];

    // Datos seleccionados por el usuario
    this.designedPI = [];
    this.planRowNames = [];

    for (let year = this.anioInicial; year <= this.anioActual; year++) {
      this.anioList.push(year);
      this.anioList.sort(
        (anioInicial: number, anioActual: number) => anioActual - anioInicial
      );
    }

    this.getLogedInUserInfo();
  }

  // INICIALIZAR FORMULARIO
  ngOnInit(): void {
    this.selectedPC = new FormControl();
    this.selectedYear = new FormControl();

    this.fullForm = new FormGroup({
      selectedYear: this.selectedYear,
    });

    this.formPR = new FormGroup({
      selectedPC: this.selectedPC,
    });
  }

  // Obtener id del usuario iniciado
  getLogedInUserInfo() {
    this.userService.validateSession().subscribe({
      next: (data) => {
        this.userInfo = data.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Obtener Partidas / abrir modal --------
  public genTrigger() {
    this.getAllPartidas();
    this.openDialog();
  }

  // OBTENER TODOS LAS PARTIDAS
  getAllPartidas() {
    this.partidasService.getAllPartidas().subscribe({
      next: (data) => {
        this.partidas = data.filter((partida: any) => partida.isActive === 'Activo');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // añadir partida a mi array de partidas seleccionadas para el periodo
  addPartida(): void {
    this.partidasValues.push(Number(this.formPR.value.selectedPC));
    this.planRowObject = {
      partidaId: Number(this.formPR.value.selectedPC),
    };

    this.designedPI.push(this.planRowObject);

    // Encontrar nombre plan de cuenta
    const findName = this.partidas.find(
      (partida: any) => partida.partidaId === this.formPR.value.selectedPC
    )?.partidaName;

    const prUserObject = {
      nombrePlan: findName,
    };

    this.planRowNames.push(prUserObject);
    return;
  }

  // Mostrar partidas aún no seleccionadas
  get filteredPartidas(): any {
    if (!this.partidas) return [];
    return this.partidas.filter(
      (partida: any) => !this.partidasValues.includes(partida.partidaId)
    );
  }

  // MODAL --------------------------------------------------------------

  dialogService = inject(ModalService);
  template = viewChild(TemplateRef);
  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  openDialog() {
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }

  //   Primero crea el nuevo periodo
  //   Luego llena la tabla periodo_partida
  submitForm() {
    // Obtengo el id del nucleo que corresponde al usuario
        this.createPeriodo(this.userInfo.nucleoId);
  }

  // Crea un array de objetos [{}] coon las partidas, el año seleccionado y nucleo Id relacionado
  createPeriodo(nucleoId: number) {
    this.designedPI.push(this.fullForm.value);
    this.designedPI.push({ nucleoId: nucleoId });
    this.periodoService.createPeriodo(this.designedPI).subscribe({
      next: (data) => {
        // esto retorna el id del periodo creado
        this.createdPeriodoId = data;
        this.attachPartidasToPeriodo(this.createdPeriodoId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  attachPartidasToPeriodo(periodoId: number) {
    this.designedPI.push({ periodoId });
    console.log(this.designedPI);
    this.partidasService.attachPartidasToPeriodo(this.designedPI).subscribe({
      next: (data) => {
        console.log(data);        
		this.designedPI = [];
        this.fullForm.reset();
        this.formPR.reset();
		alert('Periodo creado satisfactoriamente')
		window.location.reload()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
