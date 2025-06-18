import {
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import Solicitud from '../../Models/SolicitudOrigin';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import { SoporteService } from '../../../services/soporte/soporte-service';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-aprobar-solicitud',
  imports: [closeModalDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './soporte-modal.html',
  styleUrl: './soporte-modal.css',
})
export class SoporteModal implements OnInit {
  // Signal solicitud

  @Input() public solicitud!: Solicitud;

  // Modal service injects
  modalService = inject(ModalService);

  detailsModal = viewChild(TemplateRef);
  detailsModalRef = viewChild('soporteModal', { read: ViewContainerRef });

  // Formulario de soportes
  soporteForm!: FormGroup;
  soporteReferenciaOperacion!: FormControl;
  soporteTipoMoneda!: FormControl;
  soporteMonto!: FormControl;
  soporteRutaFactura!: FormControl;
  soporteRutaCartaPyR!: FormControl;

  // Variables input
  statusFinished!: number;
  soporteData!: FormData;
  facturaName!: string;
  cartaName!: string;

  // CONSTRUCTOR
  constructor(
    public soporteService: SoporteService,
    public solicitudService: SolicitudService
  ) {
    // Inicializar variables formulario
    this.soporteReferenciaOperacion = new FormControl();
    this.soporteMonto = new FormControl('', [this.montoValidator]);
    this.soporteTipoMoneda = new FormControl();
    this.soporteRutaFactura = new FormControl();
    this.soporteRutaCartaPyR = new FormControl();

    // Inicializar variables input
    this.statusFinished = 3;
	this.facturaName = '';
	this.cartaName = '';

    //Inicializar variable FormData
    this.soporteData = new FormData();
  }

  ngOnInit(): void {
    // Inicializar formulario
    this.soporteForm = new FormGroup({
      referenciaOperacion: this.soporteReferenciaOperacion,
      monto: this.soporteMonto,
      tipoMoneda: this.soporteTipoMoneda,
      rutaFactura: this.soporteRutaFactura,
      rutaCartaPyR: this.soporteRutaCartaPyR,
    });
  }

  // Open modal method
  openModal() {
    this.modalService.openDialog(
      this.detailsModal()!,
      this.detailsModalRef()!,
      { $implicit: this.solicitud }
    );
  }

  // Monto validator
  montoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Solo números y comas, al menos uno, sin espacios ni puntos ni letras
    const regex = /^[0-9.]+$/;
    return regex.test(value) ? null : { montoInvalido: true };
    // Valida si cumple con regex, si si retorna null, sino retorna montoInvalido:true
  }

  onFacturaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      // Si necesitas el archivo para subirlo, puedes guardarlo también:
      // this.archivo = input.files[0];
      this.soporteRutaFactura.setValue(input.files[0]);
	   this.facturaName = input.files[0].name
    }
  }

  onCartaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      // Si necesitas el archivo para subirlo, puedes guardarlo también:
      // this.archivo = input.files[0];
      this.soporteRutaCartaPyR.setValue(input.files[0]);
	  this.cartaName = input.files[0].name
    }
  }

  postFormValues() {
    switch (this.soporteForm.valid) {
      case this.soporteForm.value.monto === null:
        alert('Por favor, verifique el monto ingresado, recuerde usar solo numeros y punto para los decimales');
        break;

      case this.soporteForm.value.referenciaOperacion === null:
        alert('Ingrese el numero de referencia reflejada en la factura');
        break;

      case this.soporteForm.value.tipoMoneda === null:
        alert('Seleccione el tipo de moneda asociada a la transaccion');
        break;

      case this.soporteForm.value.rutaFactura === null:
        alert('Debe seleccionar un archivo que corresponda a la factura');
        break;

      case this.soporteForm.value.rutaCartaPyR === null:
        alert('Debe seleccionar un archivo que corresponda a la carta de PyR');
        break;

      default:
        // Append (Adjuntar) a soporteData (formData) que envio al backend
        this.soporteData.append('monto', this.soporteForm.value.monto);
        this.soporteData.append(
          'referenciaOperacion',
          this.soporteForm.value.referenciaOperacion
        );
        this.soporteData.append(
          'rutaCartaPyR',
          this.soporteForm.value.rutaCartaPyR
        ); // File
        this.soporteData.append(
          'rutaFactura',
          this.soporteForm.value.rutaFactura
        ); // File
        this.soporteData.append(
          'tipoMoneda',
          this.soporteForm.value.tipoMoneda
        );
        console.log('Esto envio al back', this.soporteForm.value);

		// ENVIAR INFORMACION AL BACKEND
		this.soporteService
		  .attachedSoporteSolicitud(this.solicitud.solicitudId, this.soporteData)
		  .subscribe({
			next: (data: any) => {
			  console.log(
				'respuesta despues de enviar los datos del soporte al backend',
				data
			  );
			},
			error: (err: any) => {
			  console.log('ocurrio un error al enviar los datos al backend', err);
			},
		  });
	
		// CAMBIAR EL ESTADO DE LA SOLICITUD 
		this.solicitudService.statusChange(this.solicitud.solicitudId, this.statusFinished).subscribe({
			next: (data) => {
				alert('Estado cambiado a finalizado de forma satisfactoria')
				window.location.reload()
			},
			error: (err) => {console.log('ocurrio un error al cambiar el estado', err)}
		})
        break;
    }


    // Final envio formulario
  }

  // Final de clase
}
