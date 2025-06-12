import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';


@Component({
  selector: 'app-solicitud-list',
  imports: [],
  templateUrl: './solicitud-list.html',
  styleUrl: './solicitud-list.css'
})
export class SolicitudList implements OnInit{
	periodId: number;


	constructor(private route: ActivatedRoute, public solicitudService: SolicitudService){
		this.periodId = this.route.snapshot.params['id']
		console.log('Te muestro el id del periodo segun me renderizo', this.periodId)
	}

	ngOnInit(): void {
		
		this.getSolicitudes()
	}


	getSolicitudes(){
		this.solicitudService.getSolicitudes(this.periodId)
	}
}
