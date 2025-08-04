import { Component, signal, WritableSignal } from '@angular/core';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { UserService } from '../../../services/user-services/user-service';
import { error } from 'highcharts';

@Component({
  selector: 'app-admin-resume',
  imports: [],
  templateUrl: './admin-resume.html',
  styleUrl: './admin-resume.css',
})
export class AdminResume {
  nucleosInfo!: any;
  selectedNucleo!: any;

  // Obtener todos los usuarios y los nucleos a los que estan asignados
  coordinadores!: any;

  constructor(
    public nucleoService: ServicioVG,
    public router: Router,
    public userService: UserService
  ) {
    this.getAllNucleos();
    this.obtenerDato();
    this.getAllUsers();
  }

  // Capturar el id de usuario relacionado al nucleo del cual se quieren obtener detalles.
  goToNucleoDetails(user: any, nucleo: any) {
    if (user === undefined) {
      alert('Sin coordinador asignado');
    } else {
      this.router.navigate(['dashboard/', user.userId]);
      localStorage.setItem('nucleoInfo', JSON.stringify(nucleo));
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  }

  obtenerDato(): void {
    const datoJSON = localStorage.getItem('nucleoInfo');
    if (datoJSON) {
      this.selectedNucleo = JSON.parse(datoJSON);
      console.log('Dato obtenido del LS', this.selectedNucleo);
    } else {
      this.selectedNucleo = null;
      console.log('no hay datos almacenados con esa clave');
    }
  }

  getAllNucleos() {
    this.nucleoService.getAllNucleos().subscribe({
      next: (data) => {
        this.nucleosInfo = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // obtener usuario asignado al nucleo
  nucleoCoordinador(nucleo: any) {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        const coordinador = data.find((elemento: any) => {
          elemento.nucleoId === nucleo.nucleoId;
          return elemento.userName;
        });
        console.log(coordinador);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Obtener todos los usuarios y los nucleos a los que estan asignados
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.coordinadores = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCoordinador(nucleoId: any) {
    const selectedCoord = this.coordinadores.find(
      (coordinador: any) => coordinador.nucleoId === nucleoId
    );
    return selectedCoord;
  }

  getCoordinadorName(nucleoId: any) {
    const selectedCoord = this.coordinadores.find(
      (coordinador: any) => coordinador.nucleoId === nucleoId
    );
    return selectedCoord ? selectedCoord?.nombreCoordinador : 'Sin asignar';
  }
}
