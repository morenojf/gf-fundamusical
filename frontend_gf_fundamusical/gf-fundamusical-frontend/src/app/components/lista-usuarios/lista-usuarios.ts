import { Component, Type } from '@angular/core';
import { UserService } from '../../../services/user-services/user-service';
import { NgModule } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { error } from 'highcharts';

@Component({
  selector: 'app-lista-usuarios',
  imports: [FormsModule],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  usersList!: any | undefined;
  editingUserId: number | null = null;
  editData: any = {};

  constructor(public userService: UserService) {
    this.getUsersList();
  }

  validarCorreo(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  getUsersList(): any {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.usersList = data;
      },
      error: (err) => {
        console.log('ocurrio un error', err);
      },
    });
  }

  startEdit(usuario: any) {
    this.editingUserId = usuario.userId;
    this.editData = {
      userName: usuario.userName,
      email: usuario.email,
      userPass: usuario.userPass,
    };
  }

  confirmEdit(usuario: any) {
    if (
      usuario.userName === this.editData.userName &&
      usuario.email === this.editData.email &&
      usuario.userPass === this.editData.userPass
    ) {
      this.editingUserId = null;
      this.editData = {};
    } else if (this.editData.email.length > 50) {
      alert('Correo eléctrónico invalido. Máximo 50 caracteres');
    } else if (this.editData.userName.length > 50) {
      alert('Nombre de usuario muy largo. Máximo 50 caracteres');
    } else if (this.editData.userPass.length > 100) {
      alert('Contraseña muy larga. Máximo 50 caracteres');
    } else if (
      this.editData.userPass.length == 0 ||
      this.editData.email.length == 0 ||
      this.editData.userName.length == 0
    ) {
      alert('Los campos no pueden estar vacios');
    } else if (!this.validarCorreo(this.editData.email)) {
      alert('dirección de correo electrónico invalida');
    } else {
      usuario.userName = this.editData.userName;
      usuario.email = this.editData.email;
      usuario.userPass = this.editData.userPass;
      this.editingUserId = null;
      this.editData = {};

      this.userService.changeUserInfo(usuario).subscribe({
        next: (data) => {
          alert('Usuario modificado correctamente');
        },
        error: (err) => {
          console.log(err.error.text);
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

  // styles logic, input measure
  onInputResize(measureSpan: HTMLElement, value: string) {
    measureSpan.textContent = value;
  }
}
