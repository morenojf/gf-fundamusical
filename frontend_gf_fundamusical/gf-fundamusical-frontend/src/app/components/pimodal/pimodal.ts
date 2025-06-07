import { Component, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../DIrectives/close-modal.directive';

@Component({
  selector: 'app-pimodal',
  imports: [closeModalDirective],
  templateUrl: './pimodal.html',
  styleUrl: './pimodal.css'
})
export class PImodal {


// MODAL --------------------------------------------------------------

dialogService = inject(ModalService)

template = viewChild(TemplateRef);

viewContainerRef = viewChild('template', {read: ViewContainerRef});

openDialog() {
this.dialogService.openDialog(this.template()!, this.viewContainerRef()!)
}


// --------------------------------------------------------------------
}
