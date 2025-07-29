import { Component, OnInit } from '@angular/core';
import { Header } from '../../app/components/header/header';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { ListaUsuarios } from '../../app/components/lista-usuarios/lista-usuarios';
import { AdminAsideBar } from "../../app/components/admin-aside-bar/admin-aside-bar";


@Component({
  selector: 'app-users-list',
  imports: [Header, NucleoInfo, ListaUsuarios, AdminAsideBar],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList {


}
