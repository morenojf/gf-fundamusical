import { Component, OnInit } from '@angular/core';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { AsideBar } from '../../app/components/aside-bar/aside-bar';
import { Header } from '../../app/components/header/header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-periodo-details',
  imports: [Header, AsideBar, NucleoInfo ],
  templateUrl: './periodo-details.html',
  styleUrl: './periodo-details.css'
})
export class PeriodoDetails implements OnInit{


	constructor(private route: ActivatedRoute) {

		// Esto da el valor del id como numero
		const solicitudId = this.route.snapshot.params['id']
		//this.route.snapshot.params accede a un objeto del parametro de la url {id: number}

	} 

	ngOnInit(): void {
	}


}
