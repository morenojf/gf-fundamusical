import {
  Component,
  ChangeDetectionStrategy,
  inject,
  TemplateRef,
  ViewContainerRef,
  viewChild,
  OnInit,
} from '@angular/core';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import { CommonModule } from '@angular/common';
import { OperacionesService } from '../../../services/operaciones/operaciones-service';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { UserService } from '../../../services/user-services/user-service';
import { PartidasService } from '../../../services/partidas/partidas-service';

// modal confirmación
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';

// Importacion de ActivatedRoute para componente dinamico
import { ActivatedRoute } from '@angular/router';

// Importacion manejo subscripcion para la memoria, aun no se como sirve
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-ingresos-list',
  imports: [CommonModule, closeModalDirective],
  templateUrl: './ingresos-list.html',
  styleUrl: './ingresos-list.css',
})
export class IngresosList implements OnInit{
  // Se trabaja con un array de solicitudes donde se depositan las solicitudes de la api para luego
  // modificarlas y aniadirles el nombre de plan de cuenta
  operacionesArray!: any;
  operacionesFiltered!: any;
  selectedPeriodo!: any;
  selectedMes!: any;
  nombreMeses!: any;
  allPartidas!: any;

  // información del usuario logeado
  userInfo!: any;

  // Modal de confirmacion
  dialogService = inject(ModalService);
  template = viewChild(TemplateRef);
  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  // Alamacenar ID de operacion que se desea eliminar
  operacionToDelete!: any;

  // Almacenar informacion usuario seleccionado si eres admin
  selectedUser!: any;

  // tipoPagina para cambiar comportamiento del componente
  tipoPagina!: string;

  // CONSTRUCTOR -----------------------------------------------------------
  constructor(
	  public solicitudService: SolicitudService,
	  public operacionesService: OperacionesService,
	  public userService: UserService,
	  public nucleoService: ServicioVG,
	  public partidasService: PartidasService,
	  private route: ActivatedRoute
  ) {
    this.operacionesFiltered = [];

    const date = new Date();

    this.nombreMeses = [
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

    // Obtener el periodo y el mes seleccionado
    this.obtenerMesPeriodoLS();

    // Obtener la informacion del usuario logueado
    this.getLogedInUserInfo();
  }

  // Obtener valor de la ruta para cambiar comportamiento del componente
  // Tres posibles valores, egresos-list, ingresos-list, informes-list
  ngOnInit(): void {
	this.tipoPagina = this.route.snapshot.url[0].path


  }

  // Obtener el mes seleccionado del periodo seleccionado que estaba guardado en el ls
  obtenerMesPeriodoLS(): void {
    const periodoJSON = localStorage.getItem('selected-periodo');
    const mes = localStorage.getItem('selected-mes');
    if (periodoJSON && mes) {
		this.selectedPeriodo = JSON.parse(periodoJSON);
		this.selectedMes = mes;
    } else {
      this.selectedPeriodo = null;
      console.log('no hay datos almacenados con esas clave');
    }
  }

  // obtener información del usuario logeado
  getLogedInUserInfo() {
    this.userService.validateSession().subscribe({
      next: (data) => {
      this.userInfo = data.data
	  if (this.userInfo.userRol) {
		this.obtenerDato();
	  } else{
		  this.getAllOperaciones(this.userInfo);
	  }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  	// Si soy admin obtengo mis datos del LS para ver la informacion del usuario
	  obtenerDato(): void {
    const datoJSON = localStorage.getItem('nucleoInfo');
    if (datoJSON) {
      this.selectedUser = JSON.parse(datoJSON);
	  this.getAllOperaciones(this.selectedUser)
    } else {
      this.selectedUser = null;
      console.log('no hay datos almacenados con esa clave');
    }
  }


  // obtener las operaciones realizadas por el nucleo al que pertenece el usuario
  getAllOperaciones(userInfo: any) {
    this.operacionesService.getAllOperaciones().subscribe({
      next: (data) => {
        this.filterOperaciones(
          data.filter((operacion: any) => operacion.nucleoId === userInfo.nucleoId)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Mostrar las operaciones segun el mes seleccionado
  filterOperaciones(operacionesArray: any): void {
    for (let index = 0; index < operacionesArray.length; index++) {
      const operacion = operacionesArray[index];
      const operacionFecha = new Date(operacion.operacionFecha); // (convierta la fecha a un formato date)
      const operacionMesNumero = operacionFecha.getMonth(); // 0 para Enero y 11 para Diciembre
      const operacionMesNombre = this.nombreMeses[operacionMesNumero];
      if (
        operacionMesNombre.trim().toLowerCase() ===
          this.selectedMes.trim().toLowerCase() &&
        operacion.periodoId === this.selectedPeriodo.periodoId
      ) {
        this.operacionesFiltered.push(operacion);
        this.getAllpartidas();
      }
    }
  }

  // Obtener los nombres de las partidas relacionadas a las operaciones mostradas
  getAllpartidas(): any {
    this.partidasService.getAllPartidas().subscribe({
      next: (data) => {
        this.allPartidas = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getPartidaName(operacion: any) {
    if (operacion === null) {
      return;
    } else {
      const objetoPartidaName = this.allPartidas?.find(
        (partida: any) => partida.partidaId === operacion
      );
      return objetoPartidaName?.partidaName;
    }
  }
  
  // abre modal para confirmar acción de eliminado de operación
  confirmActionBtn(operacionSelected: any) {
	
	this.operacionToDelete = operacionSelected
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }

  // Borra la operación
  deleteOperacion() {
	console.log(this.operacionToDelete)
    this.operacionesService.deleteOperacion(this.operacionToDelete.operacionId).subscribe({
      next: (data) => {
        alert('Operacion eliminada satisfactoriamente')
		this.adjustBalance(this.operacionToDelete);
		window.location.reload()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Ajusta el saldo de nucleo en base al monto de la operación eliminada
  adjustBalance(selectedOperacion: any){
	this.operacionesService.updateNucleoBalance(selectedOperacion).subscribe({
		next: (data) => {
			console.log(data)
		},
		error: (error) => {
			console.log(error)
		}
	})
  }

  // Handler convertir fecha recibida en formato (DD/MM/YYYY) con horario local
  convertDate(fecha: any) {
    const dateObj = new Date(fecha);

    const day = String(dateObj.getDate()).padStart(2, '0'); // Asegura dos dígitos (ej. 5 -> 05)
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Asegura dos dígitos y corrige el índice (ej. 7 -> 08)
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    // 3. Concatena los componentes en el formato deseado
    const fechaFormateada = `${day}/${month}/${year} ${hours}:${minutes}`;
    return fechaFormateada;
  }
}
