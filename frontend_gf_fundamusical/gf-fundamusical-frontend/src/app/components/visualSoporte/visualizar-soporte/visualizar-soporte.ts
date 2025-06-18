import { Component, Input } from '@angular/core';
import Solicitud from '../../../Models/SolicitudOrigin';
import Soporte from '../../../Models/soporteModel';
import { SoporteService } from '../../../../services/soporte/soporte-service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-visualizar-soporte',
	imports: [CommonModule],
	templateUrl: './visualizar-soporte.html',
	styleUrl: './visualizar-soporte.css'
})
export class VisualizarSoporte {

	// Solicitud info signal
	@Input() public solicitud!: Solicitud;

	// Variable para almacenar soportes
	soportes!: Soporte[];

	constructor(public soporteService: SoporteService) {
	this.getSoportes();
	}

	// Getter para soportes en base a la solicitud Actual
	  get soporteActual(): Soporte | undefined {
		if (!Array.isArray(this.soportes)) return undefined;
		return this.soportes.find(
		  (soporte) => soporte.solicitudId === this.solicitud.solicitudId
		);
	  }

	getSoportes(){
		this.soporteService.getSoportesInfo().subscribe({
			next: (data) => {
				this.soportes = data
				console.log('aqui tienes los soportes mi vido', this.soportes)
			},
			error: (err) => {
				console.log('ocurrio un error al obtener los soportes', err)
			}
		})
	}






// fin clase
}
