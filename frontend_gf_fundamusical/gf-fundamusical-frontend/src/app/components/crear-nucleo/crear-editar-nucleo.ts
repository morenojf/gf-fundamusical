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

// Services
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crear-nucleo-form',
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    closeModalDirective,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './crear-editar-nucleo.html',
  styleUrl: './crear-editar-nucleo.css',
})
export class CrearEditarNucleoForm implements OnInit {
  // Guardado de información todos los núcleos
  nucleosArray!: any;

  // Variable para edicion de campos del nucleo
  editingNucleoId!: any;
  // Datos editados
  editData: any = {};

  // Declaración del Formulario
  public formCreateNucleo!: FormGroup;
  public nucleoName!: FormControl;

  constructor(public nucleoInfo: ServicioVG) {
    //Iniciar variables del formulario
    this.nucleoName = new FormControl();

    // Obtener información de usuario para usar el menu y cerrar sesión
    this.getNucleoInfo();
  }

  ngOnInit(): void {
    // Iniciar grupo formulario
    this.formCreateNucleo = new FormGroup({
      nucleoName: this.nucleoName,
    });
  }

  // Enviar formulario al backend
  submitForm() {
    this.nucleoInfo.createNucleo(this.formCreateNucleo.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Nucleo creado con exito');
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  startEdit(nucleo: any) {
    this.editingNucleoId = nucleo.nucleoId;
    this.editData = {
      nucleoName: nucleo.nucleoName,
    };
  }

  // Edicion de nucleo
  confirmEdit(nucleo: any) {
    if (nucleo.nucleoName === this.editData.nucleoName) {
      this.editingNucleoId = null;
      this.editData = {};
    } else if (this.editData.nucleoName.length == 0) {
      alert('Los campos no pueden estar vacios');
    } else {
      nucleo.nucleoName = this.editData.nucleoName;
      this.editingNucleoId = null;
      this.editData = {};

      console.log('estoy enviando esto', nucleo);
      this.nucleoInfo.updateNucleo(nucleo).subscribe({
        next: (data) => {
          console.log(data);
          alert('Nucleo editado');
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          alert('Este nucleo ya existe');
          window.location.reload();
        },
      });
    }
  }

  // MODAL ---------------------------------------------------------------------------------

  dialogService = inject(ModalService);
  template = viewChild(TemplateRef);
  viewContainerRef = viewChild('template', { read: ViewContainerRef });

  // Abrir modal
  public genTrigger() {
    this.dialogService.openDialog(this.template()!, this.viewContainerRef()!);
  }

  // Obtener datos de nucleo
  getNucleoInfo() {
    this.nucleoInfo.getAllNucleos().subscribe({
      next: (data) => {
        this.nucleosArray = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // styles logic, input measure
  onInputResize(measureSpan: HTMLElement, value: string) {
    measureSpan.textContent = value;
  }
}
