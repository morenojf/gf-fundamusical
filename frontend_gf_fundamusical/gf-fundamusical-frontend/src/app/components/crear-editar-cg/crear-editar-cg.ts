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
import { PartidasService } from '../../../services/partidas/partidas-service';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crear-editar-cg',
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
  templateUrl: './crear-editar-cg.html',
  styleUrl: './crear-editar-cg.css',
})
export class CrearEditarCg implements OnInit{

// Guardado de información todos los núcleos
  partidasArray!: any;

  // Variable para edicion de campos del nucleo
  editingPartidaId!: any;
  // Datos editados
  editData: any = {};

  // Declaración del Formulario
  public formCreatePartida!: FormGroup;
  public partidaName!: FormControl;

  constructor(public partidasService: PartidasService) {
    //Iniciar variables del formulario
    this.partidaName = new FormControl();

    // Obtener información de usuario para usar el menu y cerrar sesión
    this.getPartidasInfo();
  }

  ngOnInit(): void {
    // Iniciar grupo formulario
    this.formCreatePartida = new FormGroup({
      partidaName: this.partidaName,
    });
  }

  // Enviar formulario al backend
  submitForm() {
    this.partidasService.createPartida(this.formCreatePartida.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Partida agregada con exito');
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  startEdit(partida: any) {
    this.editingPartidaId = partida.partidaId;
    this.editData = {
      partidaName: partida.partidaName,
    };
  }

//   Edicion de nucleo
  confirmEdit(partida: any) {
    if (partida.partidaName === this.editData.partidaName) {
      this.editingPartidaId = null;
      this.editData = {};
    } else if (this.editData.partidaName.length == 0) {
      alert('Los campos no pueden estar vacios');
    } else {
      partida.partidaName = this.editData.partidaName;
      this.editingPartidaId = null;
      this.editData = {};

      this.partidasService.updatePartida(partida).subscribe({
        next: (data) => {
          alert('Concepto de gasto editado');
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          alert('Este concepto de gasto ya existe');
          window.location.reload();
        },
      });
    }
  }

  // ACTIVAR/ DESACTIVAR PARTIDA
    desactivarPartida(partida: any) {
    this.partidasService.deactivatePartida(partida).subscribe({
      next: (data) => {
		alert('Concepto de gasto desactivado')
		window.location.reload()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  activatePartida(partida: any) {
    this.partidasService.activatePartida(partida).subscribe({
      next: (data) => {
		alert('Concepto de gasto activado')
		window.location.reload()

      },
      error: (err) => {
        console.log(err);
      },
    });
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
  getPartidasInfo() {
    this.partidasService.getAllPartidas().subscribe({
      next: (data) => {
        this.partidasArray = data;
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
