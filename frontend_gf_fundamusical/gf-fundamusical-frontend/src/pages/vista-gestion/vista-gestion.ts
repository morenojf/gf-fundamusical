import { Component, OnInit } from '@angular/core';
import { Header } from '../../app/components/header/header';
import { AsideBar } from "../../app/components/aside-bar/aside-bar";
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { DropdownPIPeriodo } from "../../app/components/dropdown-pi-periodo/dropdown-pi-periodo";

@Component({
  selector: 'app-vista-gestion',
  imports: [Header, AsideBar, NucleoInfo, DropdownPIPeriodo],
  templateUrl: './vista-gestion.html',
  styleUrl: './vista-gestion.css'
})
export class VistaGestion {


}
