import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../../services/user-services/user-service';


@Component({
	selector: 'app-crear-usuario',
	imports: [ReactiveFormsModule],
	templateUrl: './crear-usuario.html',
	styleUrl: './crear-usuario.css'
})
export class CrearUsuario {

	selectedRol!: string
	$event!: null
	creaAdmin!: boolean

	userForm: FormGroup;
	userName: FormControl;
	userEmail: FormControl;
	userPassword: FormControl;
	nucleoName: FormControl;
	coordinadorName: FormControl;
	directorName: FormControl;
	userRol: FormControl;

	userInfo!: any;

	constructor(public userService: UserService) {
		this.selectedRol = 'USER' // Asignar valor por defecto, siempre usuario

		this.userName = new FormControl('');
		this.userEmail = new FormControl('');
		this.userPassword = new FormControl('');
		this.nucleoName = new FormControl('');
		this.coordinadorName = new FormControl('');
		this.directorName = new FormControl('');
		this.userRol = new FormControl('');

		this.userForm = new FormGroup({
			userName: this.userName,
			userEmail: this.userEmail,
			userPassword: this.userPassword,
			nucleoName: this.nucleoName,
			coordinadorName: this.coordinadorName,
			directorName: this.directorName,
			userRol: this.userRol
		})
	}

	onSelectChange($event: any) {
		this.selectedRol = $event.target.value

		if (this.selectedRol === 'USER') {
			this.creaAdmin = false
		} else {
			this.creaAdmin = true
		}

	}

	submitForm(){
		this.userInfo = this.userForm.value;

		if(this.creaAdmin){
			this.userInfo.nucleoName = null
			this.userInfo.coordinadorName = null
			this.userInfo.directorName = null
		} 

		this.userService.createUser(this.userInfo).subscribe({
			next: (data) => {
				console.log(data)
				alert('Usuario creado satisfactoriamente')
				window.location.reload()
			},
			error: (error) => {
				console.log(error)
			}
		})

	}

	// @HostListener('document:')
}
