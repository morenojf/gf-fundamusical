import {
  Component,
  inject,
  Input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import Solicitud from '../../Models/SolicitudOrigin';
import { ModalService } from '../../../services/modal/modal-service';

@Component({
  selector: 'app-anular-solicitud',
  imports: [CommonModule, closeModalDirective, FormsModule],
  templateUrl: './anular-solicitud.html',
  styleUrl: './anular-solicitud.css',
})
export class AnularSolicitud {
  // Solicitud variable signal
  @Input() public solicitud!: Solicitud;

  // Modal service injects
  modalService = inject(ModalService);

  detailsModal = viewChild(TemplateRef);
  detailsModalRef = viewChild('anulacionModal', { read: ViewContainerRef });

  // Inputs for motivoAnulacion and solicitud Tables
  motivoAnulacion: string;
  canceledStatus: number;

  // CONSTRUCTOR
  constructor(public solicitudService: SolicitudService) {
    // Inicializar variables inputs
    this.motivoAnulacion = '';
    this.canceledStatus = 2;
  }

  // Open modal method
  openModal() {
    this.modalService.openDialog(
      this.detailsModal()!,
      this.detailsModalRef()!,
      { $implicit: this.solicitud }
    );
  }

  // Method to handle the anularSolicitud action

  cofirmarAnulacion(motivo: string) {
    if (!motivo || motivo.trim() === '') {
      alert('Por favor, ingrese un motivo de anulación.');
    } else {
      this.canceledStatusChange();
      this.createAnulacionMotivo(motivo);
    }
  }

  // Funcion Cambiar estado a anulado
  canceledStatusChange(): void {
    this.solicitudService
      .statusChange(this.solicitud.solicitudId, this.canceledStatus)
      .subscribe({
        next: (res: any) => {
          alert('Solicitud cancelada correctamente');
          console.log(res.message);
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
  }

  // Funcion crear nuevo motivo de anulacion
  createAnulacionMotivo(motivo: string): void {
    this.solicitudService
      .anularSolicitud(this.solicitud.solicitudId, motivo)
      .subscribe({
        next: (response: any) => {
          alert(response.message);
		  window.location.reload();
        },
        error: (err: any) => {
          console.error('Error al anular la solicitud:', err);
        },
      });
  }

  // End of class
}
