import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

// Importacion del router
import { RouterLink, RouterModule } from '@angular/router';

// Importacion de ActivatedRoute para componente dinamico
import { ActivatedRoute } from '@angular/router';

// Importación de clases de estilos dinamicas segun true o false
import { NgClass } from '@angular/common';

// Importacion de servicios
import { PeriodoService } from '../../../services/periodo/periodo-service';

// Importación del modal
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import { PartidasService } from '../../../services/partidas/partidas-service';
import { OperacionesService } from '../../../services/operaciones/operaciones-service';
import { UserService } from '../../../services/user-services/user-service';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown-pi-periodo',
  imports: [NgClass, RouterLink, RouterModule, closeModalDirective],
  templateUrl: './dropdown-pi-periodo.html',
  styleUrl: './dropdown-pi-periodo.css',
})
export class DropdownPIPeriodo implements OnInit{
  monthArray!: any;
  periodosArray!: any;
  availableMonths!: any;
  operacionesArray!: any;

  // DECLARACION MODAL
  dialogService = inject(ModalService);
  template = viewChild(TemplateRef);
  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  // ACORDEON
  acoordionCard!: any;
  acoordionHeader!: any;

  // Limpiar subscripcion de parametros de ruta, aun no se para que se usa 
    private routeSub: Subscription | undefined; // Para limpiar la suscripción

	// almacenar la ruta actual
	tipoRenderedLista!: string


  // CONSTRUCTOR
  constructor(
    public periodoService: PeriodoService,
    public partidasService: PartidasService,
    public operacionesService: OperacionesService,
    public userService: UserService,
    public nucleoService: ServicioVG,

	// Servicio para Obtener URL de la ruta para cargar el componente de lista
	private route: ActivatedRoute
  ) {
    // fecha
    const date = new Date();

    this.availableMonths = [];

    this.monthArray = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    this.getUserId();
  }

  // OnInit para capturar la ruta del componente si es ingreso o egreso o informe
  ngOnInit(): void {
	this.tipoRenderedLista = this.route.snapshot.url[0].path
  }

  // Desuscribirse para evitar fugas de memoria
  ngOnDestroy() {
	if (this.routeSub) {
		this.routeSub.unsubscribe()
	}
  }

  // Obtiene la información del usuario y su id
  getUserId() {
    this.userService.validateSession().subscribe({
      next: (data) => {
        this.getNucleoByUserId(data.data.userId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Obtiene la información del nucleo y el nucleo ID segun el id del usuario logeado
  getNucleoByUserId(userId: any) {
    this.nucleoService.getNucleoInfoByUserId(userId).subscribe({
      next: (data) => {
        this.getAllPeriodos(data.nucleoId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Obtener todos los periodos que corresponden al nucleo del usuario logeado
  getAllPeriodos(nucleoId: any) {
    this.periodoService.getAllPeriodos().subscribe({
      next: (data) => {
        this.periodosArray = data.filter(
          (periodo: any) => periodo.nucleoId === nucleoId
        );
        this.getAllOperaciones(nucleoId);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Obtener todas las operaciones que correspondan al nucleo del usuario logueado
  getAllOperaciones(nucleoId: any) {
    this.operacionesService.getAllOperaciones().subscribe({
      next: (data) => {
        this.operacionesArray = data.filter(
          (operacion: any) => operacion.nucleoId === nucleoId
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // funcion para abrir y cerrar los acordeones y renderizar los meses dispobiles segun las operaciones realizadas por mes
  acordionFunc(periodo: any, periodoId: number) {
    this.availableMonths = [];
    this.filterMonths(this.operacionesArray, periodoId);

    this.periodosArray.forEach((elemento: any) => {
      if (elemento.periodoId !== periodo.periodoId) {
        elemento.isActive = false;
        // cierra los acordeones distintos al seleccionado
      }
    });
    periodo.isActive = !periodo.isActive;
    const activeId = periodo.isActive ? periodoId : null;
  }

  // Cada vez que un modal se abre, se ejecuta esta funcion que filtra por meses
  filterMonths(operacionesArray: any, periodoId: number): void {
  const mesesSet = new Set<string>();
  for (let index = 0; index < operacionesArray.length; index++) {
    const operacion = operacionesArray[index];
    const operacionFecha = new Date(operacion.operacionFecha);
    const operacionMesNumero = operacionFecha.getMonth();
    const operacionMesNombre = this.monthArray[operacionMesNumero];
    if (operacionMesNombre && periodoId === operacion.periodoId) {
      mesesSet.add(operacionMesNombre);
    } else {
        this.availableMonths = [];
      }
    }
	this.availableMonths = Array.from(mesesSet);
  }

  // este guarda la informacion del periodo y del mes seleccionado en el ls para luego utilizarla al mostrar la lista de operaciones
  savePeriodoMonthInfo(periodo: any, mes: any) {
    localStorage.setItem('selected-periodo', JSON.stringify(periodo));
    localStorage.setItem('selected-mes', mes);
  }

  // Apertura del modal con los detalles de plan de inversion de cada periodo
  periodoDetails(periodo: any) {
    // necesito obtener las partidas relacionadas a este periodo
    // necesito obternet todas las partidas para tener los nombres
    this.partidasService.getPeriodoPartidasTable().subscribe({
      next: (data) => {
        const partidasDelPeriodo = data.filter(
          (elemento: any) => elemento.periodoId === periodo.periodoId
        );
        this.getPartidasName(partidasDelPeriodo, periodo);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Partidas para mostrar en el modal del plan de inversion del periodo
  getPartidasName(partidasDelPeriodo: any, periodo: any): any {
    this.partidasService.getAllPartidas().subscribe({
      next: (data) => {
        const partidasConNombre = partidasDelPeriodo.map(
          (partidaDelPeriodo: any) => {
            const partida = data.find(
              (elemento: any) =>
                elemento.partidaId === partidaDelPeriodo.partidaId
            );
            return {
              partidaId: partidaDelPeriodo.partidaId,
              nombre: partida ? partida.partidaName : 'Nombre no encontrado',
            };
          }
        );

        this.dialogService.openDialog(
          this.template()!,
          this.viewContainerRef()!,
          { $implicit: partidasConNombre, periodo: periodo }
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
} // FINAL DE CLASE
