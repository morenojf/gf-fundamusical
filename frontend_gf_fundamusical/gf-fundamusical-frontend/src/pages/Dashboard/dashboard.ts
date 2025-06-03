import { Component } from '@angular/core';
import { AsideBar } from "../../app/components/aside-bar/aside-bar";
import { Header } from "../../app/components/header/header";
import { NucleoInfo } from "../../app/components/nucleo-info/nucleo-info";
import { Stats } from "../../app/components/stats/stats";

@Component({
  selector: 'dashboard-page',
  imports: [AsideBar, Header, NucleoInfo, Stats],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
