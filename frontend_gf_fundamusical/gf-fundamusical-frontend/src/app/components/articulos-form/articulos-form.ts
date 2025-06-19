import {
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import Solicitud from '../../Models/SolicitudOrigin';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ArticulosService } from '../../../services/articulos/articulos-service';

@Component({
  selector: 'app-articulos-form',
  imports: [closeModalDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './articulos-form.html',
  styleUrl: './articulos-form.css',
})
export class ArticulosForm implements OnInit {
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

  // Articulo Row
  articuloRow!: {};

  // Lista de articulos
  articuloList: any[];

  // Constructor
  constructor(public articulosService: ArticulosService) {
    // Inicializar las variables
    this.articuloName = new FormControl();
    this.articuloQuantity = new FormControl();

    // Manejo valores de fila
    this.articuloQ = 0;
    this.articuloRow = {};
    this.articuloList = [];
  }

  // OnInit
  ngOnInit() {
    // Inicializar el formulario de articulos
    this.articulosForm = new FormGroup({
      nombre: this.articuloName,
      cantidad: this.articuloQuantity,
    });
  }
  // Modal directives
  articleForm = viewChild(TemplateRef);
  articleFormModalRef = viewChild('articleForm', { read: ViewContainerRef });

  articlesModal() {
    this.articuloQ = 0;
    this.articuloRow = {};
    this.articuloList = [];
    this.modalService.openDialog(
      this.articleForm()!,
      this.articleFormModalRef()!,
      { $implicit: this.solicitud }
    );
  }

  // Modal Controllers
  // Sum and Minus
  plusOne() {
    this.articuloQ++;
  }
  minusOne() {
    if (this.articuloQ >= 1) {
      this.articuloQ--;
    }
  }

  // Form submit
  addValues() {
    this.articuloQuantity.setValue(this.articuloQ);

    if (this.articulosForm.value.articuloName === null) {
      alert('Debe ingresar un nombre para el artículo.');
      return;
    } else {
      console.log(
        'Esto es lo que te doy mi rey precioso',
        this.articulosForm.value
      );

      this.articuloRow = this.articulosForm.value;
      this.articuloList.push(this.articuloRow);

      console.log('asi va tu array de articulos', this.articuloList);
    }
  }

  // Post Articles
  postArticles() {
    // Validar si hay articulos
    if (this.articuloList.length < 1) {
      alert('Debe agregar al menos un artículo.');
      return;
    } else {
		this.articulosService.postArticles(this.solicitud.solicitudId, this.articuloList).subscribe({
			next: (data) => {
				console.log('Artículos enviados correctamente:', data);
				alert('Artículos enviados correctamente.');
				window.location.reload(); // Recargar la página para ver los cambios
			},
			error: (error) => {
				console.error('Error al enviar los artículos:', error);
				alert('Error al enviar los artículos. Por favor, inténtelo de nuevo.');
			}
		})
	}

    // Reiniciar el formulario
    this.articulosForm.reset();
  }
}
