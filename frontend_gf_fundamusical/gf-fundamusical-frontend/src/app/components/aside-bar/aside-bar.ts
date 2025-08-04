import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-services/user-service';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';

@Component({
  selector: 'app-aside-bar',
  imports: [RouterLink, MatSidenavModule, MatExpansionModule, MatIconModule],
  templateUrl: './aside-bar.html',
  styleUrl: './aside-bar.css',
})
export class AsideBar {
  // expansor
  readonly panelOpenState = signal(false);

  logedInUserInfo!: any;
  selectedNucleo!: any;

  constructor(public userService: UserService, public router: Router) {
    this.getUserRol();
    this.obtenerDato();
  }

  getUserRol(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con
        // { valid: true,
        //   data: {userId: 1, userName: "nombreUsuario", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.logedInUserInfo = data.data;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  obtenerDato(): void {
    const datoJSON = localStorage.getItem('nucleoInfo');
    if (datoJSON) {
      this.selectedNucleo = JSON.parse(datoJSON);
    } else {
      this.selectedNucleo = null;
    }
  }

  // Borra el token JWT en el backend
  // Borra el LocalStorage en el frontend
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

  // Te regresa a la vista general de administrador y elimina el local storage
  backToAdmin() {
    localStorage.clear();
    this.router.navigate(['/admin-dashboard']);
  }
}
