import { Component, OnInit } from '@angular/core';
import { Header } from '../../app/components/header/header';
import { AsideBar } from '../../app/components/aside-bar/aside-bar';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { DropdownPIPeriodo } from '../../app/components/dropdown-pi-periodo/dropdown-pi-periodo';
import { UserService } from '../../services/user-services/user-service';
import { RegistrarOperacion } from '../../app/components/registrar-operacion/registrar-operacion';
import { AperturarPeriodo } from '../../app/components/aperturar-periodo/aperturar-periodo';

@Component({
  selector: 'app-modulo-egresos',
  imports: [
    Header,
    AsideBar,
    NucleoInfo,
    DropdownPIPeriodo,
    AperturarPeriodo,
    RegistrarOperacion,
  ],
  templateUrl: './modulo-egresos.html',
  styleUrl: './modulo-egresos.css',
})
export class ModuloEgresos {

	// loged in user data
	userInfo!: any;


  constructor(public userService: UserService) {
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
}
