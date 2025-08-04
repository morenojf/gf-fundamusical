import { Component } from '@angular/core';
import { Header } from '../../app/components/header/header';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';

// Servicio
import { UserService } from '../../services/user-services/user-service';

// User aside bar (tiene la vista del admin)
import { AsideBar } from '../../app/components/aside-bar/aside-bar';

// Botones de acción del usuario
import { RegistrarOperacion } from '../../app/components/registrar-operacion/registrar-operacion';
import { AperturarPeriodo } from '../../app/components/aperturar-periodo/aperturar-periodo';

// Componente variable
import { DropdownPIPeriodo } from '../../app/components/dropdown-pi-periodo/dropdown-pi-periodo';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modulo-informes',
  imports: [
    AsideBar,
    Header,
    NucleoInfo,
    RegistrarOperacion,
    AperturarPeriodo,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    DropdownPIPeriodo,
  ],
  templateUrl: './modulo-informes.html',
  styleUrl: './modulo-informes.css',
})
export class ModuloInformes {
  // angular material
  events: string[] = [];
  opened!: boolean;

  changeState() {
    this.opened = !this.opened;
  }

  userInfo!: any;

  constructor(public userService: UserService, public router: Router) {
    this.getUserInfo();
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
