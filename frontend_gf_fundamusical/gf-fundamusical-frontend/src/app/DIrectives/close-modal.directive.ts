import { Directive, inject, Optional } from "@angular/core";
import { ModalService } from "../../services/modal/modal-service";


@Directive({
	selector: '[closeModal]',
	exportAs: 'closeModal',
	host: {
		'(click)': 'closeModal()'
	}
})
export class closeModalDirective {

modalRef = inject(ModalService, {optional: true});


	closeModal(){
		if(!this.modalRef) return;
		this.modalRef.closeModal();
	}
}