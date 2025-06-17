import {
  Component,
  inject,
  Input,
  input,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { CommonModule } from '@angular/common';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import Solicitud from '../../Models/SolicitudOrigin';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import MotivosAnulacion from '../../Models/motivosAnulacion';

@Component({
  selector: 'app-motivo-anular-modal',
  imports: [CommonModule, closeModalDirective],
  templateUrl: './motivo-anular-modal.html',
  styleUrl: './motivo-anular-modal.css',
})
export class MotivoAnularModal implements OnInit {
  // modal service inject
  modalService = inject(ModalService);

  detailsModal = viewChild(TemplateRef);
  detailsModalRef = viewChild('motivoAnulacionModal', {
    read: ViewContainerRef,
  });

  // Solicitud info signal
  @Input() public solicitud!: Solicitud;

  // Variable motivos anulacion
  motivosAnulacion!: MotivosAnulacion[];

  // CONSTRUCTOR
  constructor(public solicitudService: SolicitudService) {
    this.getMotivosAnulacion();
  }

  // OnInit
  ngOnInit(): void {}

  // getter de Motivos de Anulacion en base a la solicitud Actual
  get motivoAnulacionActual(): MotivosAnulacion | undefined {
	if (!Array.isArray(this.motivosAnulacion)) return undefined;
    return this.motivosAnulacion.find(
      (motivo) => motivo.solicitudId === this.solicitud.solicitudId
    );
  }

  // Open modal method
  openModal() {
    this.modalService.openDialog(this.detailsModal()!, this.detailsModalRef()!);
  }

  // GET motivos anulacion
  getMotivosAnulacion() {
    this.solicitudService.getMotivosAnulacion().subscribe({
      next: (data) => {
        this.motivosAnulacion = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
