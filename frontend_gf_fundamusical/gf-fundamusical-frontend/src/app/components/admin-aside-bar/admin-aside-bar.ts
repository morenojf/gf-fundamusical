import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-services/user-service';

// angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';

@Component({
  selector: 'app-admin-aside-bar',
  imports: [RouterLink, MatSidenavModule, MatExpansionModule],
  templateUrl: './admin-aside-bar.html',
  styleUrl: './admin-aside-bar.css',
})
export class AdminAsideBar {
  // expansor
  readonly panelOpenState = signal(false);

  userInfo!: any;
  showUserDropdown = false;

  // Nucleos mostrados en el nav
  nucleos!: any;

  // Obtener todos los usuarios para luego filtrar por el seleccionado
  allUsers!: any;

  constructor(
    public userService: UserService,
    public router: Router,
    public nucleoService: ServicioVG
  ) {
    this.getUserInfo();
    this.getAllNucleos();
    this.getAllUsers();
  }

  getUserInfo(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con
        // { valid: true,
        //   data: {userId: 1, userName: "nombreUsuario", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.userInfo = data.data;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  // Obtener todos los nucleos para mostrar en el nav
  getAllNucleos() {
    this.nucleoService.getAllNucleos().subscribe({
      next: (data) => {
        this.nucleos = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllUsers(): any {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSelectedUser(nucleoId: any) {
    const selectedUser = this.allUsers.find(
      (user: any) => user.nucleoId === nucleoId
    );
    return selectedUser;
  }

  // acceder a vista de un usuario
  // Capturar el id de usuario relacionado al nucleo del cual se quieren obtener detalles.
  goToNucleoDetails(nucleo: any, selectedUser: any) {
    console.log(
      'usuario seleccionado',
      selectedUser,
      'nucleo seleccionado ',
      nucleo
    );

    if (selectedUser === undefined) {
      alert('Sin coordinador asignado');
    } else {
      this.router.navigate(['dashboard/', selectedUser.userId]);
      localStorage.setItem('nucleoInfo', JSON.stringify(nucleo));
      localStorage.setItem('userInfo', JSON.stringify(selectedUser));
    }
  }
}
