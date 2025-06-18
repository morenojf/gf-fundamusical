import {
  Component,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import { CommonModule } from '@angular/common';

import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import Solicitud from '../../Models/SolicitudOrigin';
import { ArticulosForm } from '../articulos-form/articulos-form';
import { AnularSolicitud } from '../anular-solicitud/anular-solicitud';
import MotivosAnulacion from '../../Models/motivosAnulacion';
import { MotivoAnularModal } from '../motivo-anular-modal/motivo-anular-modal';
import { SoporteModal } from '../soporte-modal/soporte-modal';
import { VisualizarSoporte } from '../visualSoporte/visualizar-soporte/visualizar-soporte';

@Component({
  selector: 'app-solicitud-list',
  imports: [
    CommonModule,
    closeModalDirective,
    ArticulosForm,
    AnularSolicitud,
    MotivoAnularModal,
	SoporteModal,
	VisualizarSoporte
  ],
  templateUrl: './solicitud-list.html',
  styleUrl: './solicitud-list.css',
})
export class SolicitudList implements OnInit {
  periodId: number;

  // Se trabaja con un array de solicitudes donde se depositan las solicitudes de la api para luego
  // modificarlas y aniadirles el nombre de plan de cuenta
  solicitudes!: Solicitud[];

  //Motivos de anulacion de las solicitudes
  motivosAnulacion!: MotivosAnulacion[];

  // Modal
  modalService = inject(ModalService);

  detailsModal = viewChild(TemplateRef);
  detailsModalRef = viewChild('detailsModal', { read: ViewContainerRef });

  showDetails(solicitud: Solicitud) {
    this.modalService.openDialog(
      this.detailsModal()!,
      this.detailsModalRef()!,
      { $implicit: solicitud }
    );
  }

  // CONSTRUCTOR -----------------------------------------------------------
  constructor(
    private route: ActivatedRoute,
    public solicitudService: SolicitudService
  ) {
    this.periodId = this.route.snapshot.params['id'];
    console.log(
      'Te muestro el id del periodo segun me renderizo',
      this.periodId
    );
    this.getSolicitudes();
  }

  // NGONINIT -----------------------------------------------------------
  ngOnInit(): void {
  }

  // Method to fetch solicitudes based on periodId
  getSolicitudes() {
    this.solicitudService.getSolicitudes(this.periodId).subscribe({
      next: (data) => {
        this.solicitudService.solicitudes = data;
        console.log(
          'Solicitudes obtenidas:',
          this.solicitudService.solicitudes
        );
        // Hasta aqui todo bien, se obtienen las solicitudes segun el tipo
        this.solicitudes = this.solicitudService.solicitudes;
        // Fetch PC names for each solicitud
        this.solicitudes.forEach((solicitud) => {
          if ('planInversionPlanCuentaId' in solicitud) {
            this.findPC(solicitud.planInversionPlanCuentaId);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener las solicitudes:', error);
      },
    });
  }

  findPC(PIPCid: number): void {
    this.solicitudService.getPCnameByPIPCid(PIPCid).subscribe({
      next: (data) => {
        // Busca la solicitud correspondiente y actualiza su propiedad
        const solicitud = this.solicitudes.find(
          (s) => s.planInversionPlanCuentaId === PIPCid
        );
        if (solicitud) {
          solicitud.planCuentaName = data[0].planCuentaName;
        }
      },
      error: (e) => {
        console.log('Error al obtener Planes de Cuenta:', e);
      },
    });
  }


  // Helper methods to get status text and class based on status code

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'En Proceso';
      case 2:
        return 'Anulado';
      case 3:
        return 'Finalizado';
      default:
        return 'Desconocido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'estado-proceso proceso';
      case 2:
        return 'estado-proceso anulado';
      case 3:
        return 'estado-proceso finalizado';
      default:
        return 'estado-proceso';
    }
  }

  //---------------------------------------------------
}
