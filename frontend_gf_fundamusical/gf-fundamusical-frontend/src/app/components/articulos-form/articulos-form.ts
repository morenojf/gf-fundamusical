import {
  Component,
  inject,
  Input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../DIrectives/close-modal.directive';
import Solicitud from '../../Models/SolicitudModel';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-articulos-form',
  imports: [closeModalDirective],
  templateUrl: './articulos-form.html',
  styleUrl: './articulos-form.css',
})
export class ArticulosForm {
  // Servicios
  modalService = inject(ModalService);

  // Obtener la solicitud iterada para mostrar en el modal
  @Input() public solicitud!: Solicitud;

  // Formulario de articulos
  articulosForm!: FormGroup;
  articuloName!: FormControl;
  articuloQuantity!: FormControl;

  // Variables
  articuloQ: number;

  articulos: any[]


  constructor() {
    this.articuloQ = 0;
	this.articulos = [];
  }

  articleForm = viewChild(TemplateRef);
  articleFormModalRef = viewChild('articleForm', { read: ViewContainerRef });

  articlesForm() {
	this.articuloQ = 0;
    this.modalService.openDialog(
      this.articleForm()!,
      this.articleFormModalRef()!,
      { $implicit: this.solicitud }
    );
  }

  // Modal Controllers

// Sum and Minus
  plusOne() {this.articuloQ++;}
  minusOne() {
	if(this.articuloQ >= 1){this.articuloQ--;}
  }

// Add article
  addArticle() {
	if (this.articuloQ > 0) {
	  this.articulos.push({
		cantidad: this.articuloQ,
		articulo: ''
	  });
	  this.articuloQ = 0;
	}
  }
}
