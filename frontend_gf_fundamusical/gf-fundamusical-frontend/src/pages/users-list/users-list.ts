import { Component, OnInit } from '@angular/core';
import { Header } from '../../app/components/header/header';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { ListaUsuarios } from '../../app/components/lista-usuarios/lista-usuarios';
import { AdminAsideBar } from '../../app/components/admin-aside-bar/admin-aside-bar';

// Servicio
import { UserService } from '../../services/user-services/user-service';

// Angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  imports: [
    Header,
    NucleoInfo,
    ListaUsuarios,
    AdminAsideBar,
    MatIconModule,
    MatSidenavModule,
	MatButtonModule
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {
  // angular material
  events: string[] = [];
  opened!: boolean;

  userRol!: string;

  // Constructor para pedir datos del usuario y para renavegar fuera de la app
  constructor(public userService: UserService, public router: Router) {
	this.getUserInfo();
  }

  // Obtener datos del usuario
  getUserInfo(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con
        // { valid: true,
        //   data: {userId: 1, userName: "nombreUsuario", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.userRol = data.data.userRol;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  // Abrir menu lateral
  changeState() {
    this.opened = !this.opened;
  }

  // Cerrar sesión
  logOut() {
    this.userService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/']);
        localStorage.clear();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
