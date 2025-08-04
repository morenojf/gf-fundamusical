// Core
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
} from '@angular/core';

// Modal service
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';

// Formularios
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';

// Angular Material design
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Servicios
import { PartidasService } from '../../../services/partidas/partidas-service';
import { PeriodoService } from '../../../services/periodo/periodo-service';
import { UserService } from '../../../services/user-services/user-service';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { error } from 'highcharts';
import { OperacionesService } from '../../../services/operaciones/operaciones-service';

@Component({
  selector: 'app-registrar-operacion',
  imports: [
    closeModalDirective,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './registrar-operacion.html',
  styleUrl: './registrar-operacion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class RegistrarOperacion implements OnInit {
  // Calendario maximos y minimos
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date();

  // Condicional para renderizado
  operacionTipo = 'INGRESO';
  periodoIsSelected: boolean = false;

  // NucleoInfo para filtrar los periodos obtenidos
  logedInNucleoInfo!: any;

  // Todos los periodos creados filtrados por nucleoId
  periodosArray!: any;

  // Array de Partidas
  partidas!: any;

  // Loged In User Info
  userInfo!: any;

  // Declaración del formulario:
  public formRegistroOperacion!: FormGroup;
  public fecha!: FormControl;
  public hora!: FormControl;
  public selectedPeriodo!: FormControl;
  public ingresoEgreso!: FormControl;
  public partida!: FormControl;
  public descripcion!: FormControl;
  public nComprobante!: FormControl;
  public montoOperacion!: FormControl;
  public facturaRuta!: FormControl;
  public soporteCartaRuta!: FormControl;
  public nucleoId!: FormControl;

  // Variable para pasar archivos adjuntos
  soporteData!: FormData;

  // Nombre archivos adjuntos
  facturaName!: any;
  cartaName!: any;

  // CONSTRUCTOR -----------------------------------------------------------

  constructor(
    public partidasService: PartidasService,
    public periodoService: PeriodoService,
    public userService: UserService,
    public nucleoInfo: ServicioVG,
    public operacionesService: OperacionesService
  ) {
    // Iniciar variables del formulario
    this.fecha = new FormControl();
    this.hora = new FormControl();
    this.selectedPeriodo = new FormControl();
    this.ingresoEgreso = new FormControl();
    this.partida = new FormControl();
    this.descripcion = new FormControl();
    this.nComprobante = new FormControl();
    this.montoOperacion = new FormControl();
    this.facturaRuta = new FormControl();
    this.soporteCartaRuta = new FormControl();
    this.nucleoId = new FormControl();

    // Variable form data para pasar archivos
    this.soporteData = new FormData();

    // Traer información del usuario
    this.getLogedInUserInfo();
  }

  // ON INIT ---------------------------------------------------------------
  ngOnInit(): void {
    // Inicializar Grupo de formulario
    this.formRegistroOperacion = new FormGroup({
      fecha: this.fecha,
      hora: this.hora,
      selectedPeriodo: this.selectedPeriodo,
      ingresoEgreso: this.ingresoEgreso,
      partida: this.partida,
      descripcion: this.descripcion,
      nComprobante: this.nComprobante,
      montoOperacion: this.montoOperacion,
      facturaRuta: this.facturaRuta,
      soporteCartaRuta: this.soporteCartaRuta,
      nucleoId: this.nucleoId,
    });
  }

  // Obtener Partidas / abrir modal --------
  public genTrigger() {
    if (!this.periodosArray.length) {
      alert('POR FAVOR APERTURE UN PERIODO');
      window.location.reload();
    } else {
      this.openDialog();
    }
  }

  // Obtener id del usuario iniciado
  getLogedInUserInfo() {
    this.userService.validateSession().subscribe({
      next: (data) => {
        this.userInfo = data.data;
        this.nucleoId.setValue(this.userInfo.nucleoId);
        this.getAllPeriodos(this.userInfo);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // OBTENER TODOS LOS PERIODOS Y FILTRARLOS POR EL NUCLEO ID
  getAllPeriodos(userInfo: any) {
    this.periodoService.getAllPeriodos().subscribe({
      next: (data) => {
        this.periodosArray = data.filter(
          (periodo: any) => periodo.nucleoId === userInfo.nucleoId
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // OBTENER TODO DE periodo_partida Y FILTRAR POR PERIODO ID
  getPeriodoPartidas(periodoId: any) {
    this.partidasService.getPeriodoPartidasTable().subscribe({
      next: (data) => {
        this.periodoIsSelected = true;
        // Enviamos las partidas filtradas para obtener sus nombres
        this.getAllPartidas(
          data.filter((partida: any) => partida.periodoId === periodoId)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // OBTENER TODOS LAS PARTIDAS PARA TOMAR LOS NOMBRES QUE COINCIDAN CON EL CRITERIO DE BUSQUEDA
  getAllPartidas(filteredPartidas: any) {
    this.partidasService.getAllPartidas().subscribe({
      next: (data) => {
        // data = todas las partidas
        // filteredPartidas = partidas del periodo
        this.partidas = filteredPartidas.map((partidaPeriodo: any) => {
          const partida = data.find(
            (p: any) => p.partidaId === partidaPeriodo.partidaId
          );
          return {
            partidaId: partidaPeriodo.partidaId,
            partidaName: partida ? partida.partidaName : 'Nombre no encontrado',
          };
        });
        // Si solo quieres los nombres:
        // const nombres = partidasConNombre.map(p => p.partidaName);
        // console.log(nombres);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // ENVIAR DATOS AL BACKEND
  submitForm() {
    this.soporteData.append('fecha', this.formRegistroOperacion.value.fecha);
    this.soporteData.append('hora', this.formRegistroOperacion.value.hora);
    this.soporteData.append(
      'selectedPeriodo',
      this.formRegistroOperacion.value.selectedPeriodo
    );
    this.soporteData.append(
      'ingresoEgreso',
      this.formRegistroOperacion.value.ingresoEgreso
    );

    this.soporteData.append(
      'partida',
      this.formRegistroOperacion.value.partida
    );

    this.soporteData.append(
      'descripcion',
      this.formRegistroOperacion.value.descripcion
    );
    this.soporteData.append(
      'nComprobante',
      this.formRegistroOperacion.value.nComprobante
    );
    this.soporteData.append(
      'montoOperacion',
      this.formRegistroOperacion.value.montoOperacion
    );
    this.soporteData.append(
      'facturaRuta',
      this.formRegistroOperacion.value.facturaRuta
    );
    this.soporteData.append(
      'soporteCartaRuta',
      this.formRegistroOperacion.value.soporteCartaRuta
    );
    this.soporteData.append(
      'nucleoId',
      this.formRegistroOperacion.value.nucleoId
    );

    this.operacionesService.createOperacion(this.soporteData).subscribe({
      next: (data) => {
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Metodo para factura
  // Este metodo rellena el valor de la ruta carta del formulario
  onFacturaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      // Si necesitas el archivo para subirlo, puedes guardarlo también:
      // this.archivo = input.files[0];
      this.facturaRuta.setValue(input.files[0]);
      this.facturaName = input.files[0].name;
    }
  }

  // Metodo para carta
  // Este metodo rellena el valor de la ruta carta del formulario
  onCartaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      // Si necesitas el archivo para subirlo, puedes guardarlo también:
      // this.archivo = input.files[0];
      this.soporteCartaRuta.setValue(input.files[0]);
      this.cartaName = input.files[0].name;
    }
  }

  // MODAL --------------------------------------------------------------

  dialogService = inject(ModalService);
  template = viewChild(TemplateRef);
  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  openDialog() {
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }
}
