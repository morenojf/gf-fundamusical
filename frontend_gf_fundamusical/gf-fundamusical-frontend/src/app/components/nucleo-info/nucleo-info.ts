import { Component, OnInit } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { UserService } from '../../../services/user-services/user-service';

@Component({
  selector: 'app-nucleo-info',
  imports: [],
  templateUrl: './nucleo-info.html',
  styleUrl: './nucleo-info.css',
})
export class NucleoInfo {
  userId!: number;
  userRol!: string;
  userInfo!: any;
  selectedNucleoInfo!: any;
  logedInNucleo!: any;

  constructor(public servicioVG: ServicioVG, public userService: UserService) {
    this.getUserInfo(); //Obtener los datos del usuario logeado
	this.obtenerDatoNucleoLS();
  }

  getUserInfo(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con
        // { valid: true,
        //   data: {userId: 1, userName: "nombreUsuario", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.userRol = data.data.userRol;
        this.userInfo = data.data;
        this.userId = data.data.userId;
        this.getNucleoInfoByUserId(this.userId);
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  getNucleoInfoByUserId(idUser: number): void {
    this.servicioVG.getNucleoInfoByUserId(idUser).subscribe({
      next: (data) => {
        this.logedInNucleo = data
      },
      error(err) {
        console.log(err);
      },
    });
  }

  obtenerDatoNucleoLS(): void {
    const datoJSON = localStorage.getItem('nucleoInfo');
    if (datoJSON) {
      this.selectedNucleoInfo = JSON.parse(datoJSON);
    } else {
      this.selectedNucleoInfo = null;
    }
  }
}
