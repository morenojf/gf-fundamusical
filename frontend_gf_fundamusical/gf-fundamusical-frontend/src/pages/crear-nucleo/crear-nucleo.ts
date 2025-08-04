import { Component } from '@angular/core';
import { Header } from '../../app/components/header/header';
import { AdminAsideBar } from '../../app/components/admin-aside-bar/admin-aside-bar';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';


// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

// User service
import { UserService } from '../../services/user-services/user-service';
import { CrearEditarNucleoForm } from '../../app/components/crear-nucleo/crear-editar-nucleo';



@Component({
  selector: 'app-crear-nucleo',
  imports: [
	  Header,
	  AdminAsideBar,
	  NucleoInfo,
	  MatSidenavModule,
	  MatButtonModule,
	  MatIconModule,
	  CrearEditarNucleoForm
	],
  templateUrl: './crear-nucleo.html',
  styleUrl: './crear-nucleo.css'
})
export class CrearNucleo {


  // angular material
  events: string[] = [];
  opened!: boolean;

  changeState(){
	this.opened = !this.opened
  }

  userRol!: string;

  constructor(public userService: UserService, public router: Router) {
	this.getUserInfo();
  }

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
