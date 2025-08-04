import { Component, Type } from '@angular/core';
import { UserService } from '../../../services/user-services/user-service';
import { NgModule } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { error } from 'highcharts';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';

// angular material
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-usuarios',
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  usersList!: any | undefined;
  editingUserId: number | null = null;
  editData: any = {};

  // Opcion de nucleo asignada al editar el usuario
  newAssignedNucleo!: any;

  availableNucleos!: any;

  constructor(
    public userService: UserService,
    public nucleoService: ServicioVG
  ) {
    this.getNucleos();
  }

  // primero se obtienen todos los nucleos y se mapean para tener un array con nucleos id y nucleos name
  getNucleos() {
    this.nucleoService.getAllNucleos().subscribe({
      next: (nucleos) => {
        const nucleosMap = new Map(
          nucleos.map((n: any) => [n.nucleoId, n.nucleoName])
        );
        this.getUsersList(nucleosMap);
        this.getAvailableNucleos(nucleos);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // luego se obtienen los usuarios y se mapea para añadir una nueva clave donde al buscar en los nucleos mapeados obtengamos el nucleo que coincida con el usuario.nucleoId a través del get
  getUsersList(nucleos: any): any {
    this.userService.getAllUsers().subscribe({
      next: (usuarios: any) => {
        this.usersList = usuarios.map((usuario: any) => {
          const nombreDelNucleo =
            nucleos.get(usuario.nucleoId) || 'Nucleo no encontrado';
          return {
            ...usuario,
            nucleoName: nombreDelNucleo,
          };
        });
      },
      error: (err) => {
        console.log('ocurrio un error', err);
      },
    });
  }

  validarCorreo(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  startEdit(usuario: any) {
    this.editingUserId = usuario.userId;
    this.editData = {
      nombreCoordinador: usuario.nombreCoordinador,
      cedula: usuario.cedulaCoordinador,
      nucleo: usuario.nucleoId,
      telefono: usuario.telefonoCoordinador,
      email: usuario.email,
      userPass: usuario.userPass,
    };
  }

  confirmEdit(usuario: any) {
    // Si los campos son todos iguales
    if (
      usuario.nombreCoordinador === this.editData.nombreCoordinador &&
      usuario.cedulaCoordinador === this.editData.cedula &&
      usuario.telefonoCoordinador === this.editData.telefono &&
      usuario.nucleoId === this.newAssignedNucleo &&
      usuario.email === this.editData.email &&
      usuario.userPass === this.editData.userPass
    ) {
      this.editingUserId = null;
      this.editData = {};
    } else if (this.editData.email.length > 50) {
      alert('Correo eléctrónico invalido. Máximo 50 caracteres');
    } else if (this.editData.userPass.length > 100) {
      alert('Contraseña muy larga. Máximo 50 caracteres');
    } else if (
      this.editData.userPass.length == 0 ||
      this.editData.email.length == 0 ||
      this.editData.nombreCoordinador.length == 0 ||
      this.editData.cedula.length == 0 ||
      this.editData.nucleo.length == 0 ||
      this.editData.telefono.length == 0
    ) {
      alert('Los campos no pueden estar vacios');
    } else if (!this.validarCorreo(this.editData.email)) {
      alert('dirección de correo electrónico invalida');
    } else {
      usuario.nombreCoordinador = this.editData.nombreCoordinador;
      usuario.cedulaCoordinador = this.editData.cedula;
      usuario.telefonoCoordinador = this.editData.telefono;
      usuario.nucleoId = this.newAssignedNucleo;
      usuario.email = this.editData.email;
      usuario.userPass = this.editData.userPass;
      this.editingUserId = null;
      this.editData = {};
      this.newAssignedNucleo = null;

      this.userService.changeUserInfo(usuario).subscribe({
        next: (data) => {
          console.log(data);
          alert('Usuario modificado correctamente');
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          this.editingUserId = null;
          this.editData = {};
        },
      });
    }
  }

  desactivarUsuario(usuario: any) {
    this.userService.deactivateUser(usuario).subscribe({
      next: (data) => {
        alert('Usuario desactivado de forma satisfactoria');
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  activateUser(usuario: any) {
    this.userService.activateUser(usuario).subscribe({
      next: (data) => {
        alert('Usuario reactivado de forma satisfactoria');
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // obtener los nucleos disponibles para cambiar al usuario
  getAvailableNucleos(nucleos: any) {
    this.nucleoService.getUsuarioNucleo().subscribe({
      next: (data: any) => {
        this.availableNucleos = nucleos.filter(
          (nucleo: any) =>
            !data.some(
              (usuarioNucleo: any) => usuarioNucleo.nucleoId === nucleo.nucleoId
            )
        );
      },
    });
  }

  onSelectEvent(event: any) {
    this.newAssignedNucleo = event.target.value;
  }

  // styles logic, input measure
  onInputResize(measureSpan: HTMLElement, value: string) {
    measureSpan.textContent = value;
  }
}
