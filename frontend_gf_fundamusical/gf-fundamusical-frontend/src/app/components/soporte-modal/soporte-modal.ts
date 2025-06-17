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
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  facturaRuta!: string;
  cartaPyRruta!: string;

  // CONSTRUCTOR
  constructor(
    public soporteSevice: SoporteService,
    public solicitudService: SolicitudService
  ) {
    // Inicializar variables formulario
    this.soporteReferenciaOperacion = new FormControl();
    this.soporteMonto = new FormControl();
    this.soporteTipoMoneda = new FormControl();
    this.soporteRutaFactura = new FormControl();
    this.soporteRutaCartaPyR = new FormControl();

    // Inicializar variables input
    this.facturaRuta = '';
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

  onFacturaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      this.facturaRuta = input.files[0].name;
      // Si necesitas el archivo para subirlo, puedes guardarlo también:
      // this.archivo = input.files[0];

      console.log(this.facturaRuta);
    }
  }

    onCartaSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files[0]);
      this.cartaPyRruta = input.files[0].name;
      // Si necesitas el archivo para subirlo, puedes guardarlo también:
      // this.archivo = input.files[0];

    }
	      console.log('Este es mi archivo de carta', this.cartaPyRruta, 'Y este es mi archivo de factura', this.facturaRuta);

  }
}
