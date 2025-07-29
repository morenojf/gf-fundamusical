import { Component } from '@angular/core';
import { AsideBar } from '../../app/components/aside-bar/aside-bar';
import { Header } from '../../app/components/header/header';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { Stats } from '../../app/components/stats/stats';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-services/user-service';
import { RegistrarOperacion } from "../../app/components/registrar-operacion/registrar-operacion";
import { AperturarPeriodo } from "../../app/components/aperturar-periodo/aperturar-periodo";

@Component({
  selector: 'dashboard-page',
  imports: [AsideBar, Header, NucleoInfo, Stats, RegistrarOperacion, AperturarPeriodo],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  userRol!: any;

  constructor(public userService: UserService) {
    this.getUserInfo(); // esto se supone que va a retornar USER o ADMIN
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
}
