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

  // obtener todos los nucleos para buscar el nombre del nucleo asignado al usuario logeado
  allNucleos!: any;

  constructor(public servicioVG: ServicioVG, public userService: UserService) {
    this.getUserInfo(); //Obtener los datos del usuario logeado
    this.obtenerDatoNucleoLS();
    this.getAllNucleos();
  }

  getUserInfo(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con
        // { valid: true,
        //   data: {userId: 1, nombreCoordinador: "nombreUsuario", cedulaCoordinador: "cedulaCoordinador", telefonoCoordinador: "telefono", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.userRol = data.data.userRol;
        this.userInfo = data.data;
        this.userId = data.data.userId;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  getAllNucleos() {
    this.servicioVG.getAllNucleos().subscribe({
      next: (data) => {
        this.allNucleos = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getNucleoName(nucleoId: any): any {
    const selectedNucleo = this.allNucleos.find(
      (nucleo: any) => nucleo.nucleoId === nucleoId
    );
    return selectedNucleo ? selectedNucleo.nucleoName : 'No Encontrado';
  }

  // Cuando el administrador selecciona un nucleo entonces obtiene los datos de acá y carga información del nucleo para mostrar en el nucleo Info y tener en su ls
  obtenerDatoNucleoLS(): void {
    const datoJSON = localStorage.getItem('nucleoInfo');
    if (datoJSON) {
      this.selectedNucleoInfo = JSON.parse(datoJSON);
    } else {
      this.selectedNucleoInfo = null;
    }
  }
}
