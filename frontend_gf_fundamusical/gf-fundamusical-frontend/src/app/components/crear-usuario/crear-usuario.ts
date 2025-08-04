import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user-services/user-service';

// Validator
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

// angular material
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { error } from 'highcharts';

// servicio 
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';


@Component({
  selector: 'app-crear-usuario',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
  // mensaje de error inputs
  errorMessage = signal('');

  // Nucleos
  nucleosArray!: any;

  selectedRol!: string;
  $event!: null;
  creaAdmin!: boolean;

  userForm: FormGroup;
  nombreCoordinador: FormControl;
  cedulaCoordinador: FormControl;
  telefonoCoordinador: FormControl;
  userEmail: FormControl;
  userPassword: FormControl;
  nucleoId: FormControl;
  userRol: FormControl;

  userInfo!: any;

  constructor(
    public userService: UserService,
    public nucleoService: ServicioVG
  ) {
    this.selectedRol = 'USER'; // Asignar valor por defecto, siempre usuario
    this.cedulaCoordinador = new FormControl('');
    this.telefonoCoordinador = new FormControl('');
    this.nombreCoordinador = new FormControl('');
    this.userEmail = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userPassword = new FormControl('');
    this.nombreCoordinador = new FormControl('');
    this.userRol = new FormControl('');
    this.nucleoId = new FormControl('');

    this.userForm = new FormGroup({
      nombreCoordinador: this.nombreCoordinador,
      cedulaCoordinador: this.cedulaCoordinador,
      telefonoCoordinador: this.telefonoCoordinador,
      userEmail: this.userEmail,
      userPassword: this.userPassword,
      nucleoId: this.nucleoId,
      userRol: this.userRol,
    });

    // Validator email sutff
    merge(this.userEmail.statusChanges, this.userEmail.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    this.getAllNucleos();
  }

  // Obtener todos los núcleos creados
  getAllNucleos() {
    this.nucleoService.getAllNucleos().subscribe({
      next: (data) => {
        this.getAvailableNucleos(data)
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAvailableNucleos(nucleos: any){
	this.nucleoService.getUsuarioNucleo().subscribe({
		next: (data: any) => {
			this.nucleosArray = nucleos.filter((nucleo: any) => !data.some((usuarioNucleo: any) => usuarioNucleo.nucleoId === nucleo.nucleoId))
		}
		})
  }

  // error message validator
  updateErrorMessage() {
    if (this.userEmail.hasError('required')) {
      this.errorMessage.set('Obligatorio');
    } else if (this.userEmail.hasError('email')) {
      this.errorMessage.set('Correo inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  // Desactivar cuando es admin
  disableSelect = new FormControl(false);

  submitForm() {
    this.userInfo = this.userForm.value;

    if (this.userForm.value.userRol === 'ADMIN') {
      this.userInfo.nucleoId = null;
    }

    if (this.userForm.invalid) {
      alert('Asegurate de llenar todos los campos');
    } else {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (data) => {
          alert('Usuario creado con extio');
          window.location.reload();
        },
        error: (error) => {
			alert('Ocurrio un error inesperado en la creación de usuario')

		},
      });
    }
  }

  // Esconder contraseña
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
