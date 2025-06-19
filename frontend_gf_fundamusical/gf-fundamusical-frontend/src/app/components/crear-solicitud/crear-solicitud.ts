import { Component, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../../services/modal/modal-service';
import { closeModalDirective } from '../../Directives/close-modal.directive';
import { ServicioVG } from '../../../services/vista-gestion/servicio-vg';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import { ActivatedRoute } from '@angular/router';
import Periodos from '../../Models/periodos';
import PCbyPI from '../../Models/PCbyPI';
import { DropdownPIPeriodo } from '../dropdown-pi-periodo/dropdown-pi-periodo';
import SubCategoria from '../../Models/subCategorias';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
	selector: 'app-crear-solicitud',
	imports: [closeModalDirective, ReactiveFormsModule, FormsModule],
	templateUrl: './crear-solicitud.html',
	styleUrl: './crear-solicitud.css'
})
export class CrearSolicitud implements OnInit {


	// Modal service injects
	modalService = inject(ModalService);

	detailsModal = viewChild(TemplateRef);
	detailsModalRef = viewChild('createSolicitudModal', { read: ViewContainerRef });

	// Current period ID and Period Object
	periodo!: Periodos | undefined;
	// snapshot param
	periodoId: number;

	// Available PCs options
	availablePC!: PCbyPI[]
	selectedPC!: number

	// Form declarations
	public solicitudForm!: FormGroup;
	public solicitudPIPC!: FormControl;
	public solicitudMotivo!: FormControl;

	// variable sent to backend
	designedSolicitud!: {
		userId: number,
		periodoId: number,
		solicitudPIPC: number
		solicitudMotivo: string | null,
	}


	constructor(public servicioVG: ServicioVG, public solicitudService: SolicitudService, private route: ActivatedRoute) {

		// Obterner el periodo Id actual
		this.periodoId = this.route.snapshot.params['id']

		//Obtener current periodo Object 
		this.getPeriodoInfo();

		// Inicializar formulacion 
		this.solicitudPIPC = new FormControl();
		this.solicitudMotivo = new FormControl();

		this.solicitudForm = new FormGroup ({
			solicitudPIPC: this.solicitudPIPC,
			solicitudMotivo: this.solicitudMotivo
		})

	}

	ngOnInit(): void {
	}

	getPeriodoInfo() {
		this.servicioVG.getPeriodoInfo(this.periodoId).subscribe({
			next: (data) => {
				this.periodo = data
			},
			error: (err) => {
				console.log('Error al obtener los periodos en el componente de creacion de solicitud', err)
			}
		})
	}

	onPlanCuentaChange(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		this.selectedPC = Number(selectElement.value);
	}


	get currentPC(): PCbyPI | undefined {
		if (!this.availablePC) return undefined;
		return this.availablePC.find((PC) => { return PC.PIPCid == this.selectedPC })
	}



	// trigger openModal and getInfo
	trigger() {
		this.openModal()
		this.getPCbyPI()
	}


	// Open modal method
	openModal() {
		this.modalService.openDialog(
			this.detailsModal()!,
			this.detailsModalRef()!
		);
	}

	// get info method
	getPCbyPI() {
		this.solicitudService.getPCnameByPIid(this.periodo?.planInversionId).subscribe({
			next: (data) => {
				this.availablePC = data
				console.log('estos son los planes disponibles desde la variable', this.availablePC)


			},
			error: (err) => {
				console.log('error obteniendo los planes de cuenta', err)
			}
		})
	}


	// FETCH TO BACKEND
	createSolicitud(){
		this.designedSolicitud = {
			userId: this.solicitudService.userId,
			periodoId: Number(this.periodoId),
			solicitudPIPC: Number(this.solicitudForm.value.solicitudPIPC),
			solicitudMotivo: this.solicitudForm.value.solicitudMotivo
		}

		this.solicitudService.createSolicitud(this.designedSolicitud).subscribe({
			next: (data) => {
				alert('Solicitud creada correctamente')
				window.location.reload()
			},
			error: (err) => {
				console.log('Ocurrio un error al crear la solicitud', err)
			}
		})
	}

	// handler
	getLetter($index: number) {
		const letter = String.fromCharCode(97 + $index)
		return letter
	}
}
