import { Component } from '@angular/core';
import { AsideBar } from '../../app/components/aside-bar/aside-bar';
import { Header } from '../../app/components/header/header';
import { CrearUsuario } from '../../app/components/crear-usuario/crear-usuario';
import { AdminAsideBar } from "../../app/components/admin-aside-bar/admin-aside-bar";

@Component({
  selector: 'app-crear-usuario-nucleo',
  imports: [ Header, CrearUsuario, AdminAsideBar],
  templateUrl: './crear-usuario-nucleo.html',
  styleUrl: './crear-usuario-nucleo.css'
})
export class CrearUsuarioNucleo {

}
