import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../app/components/LoginForm/loginForm';

@Component({
  selector: 'login-page',
  imports: [ReactiveFormsModule, LoginForm],
  templateUrl: './LoginPage.html',
  styleUrl: './LoginPage.css'
})
export class LoginPage {

	loginForm: FormGroup; 
	userName: FormControl;
	password: FormControl;

	constructor(){
		this.userName = new FormControl('', [Validators.required, Validators.email]);
		this.password = new FormControl('', [Validators.required]);

		this.loginForm = new FormGroup({
			userName: this.userName,
			password: this.password
		})
	}

	loginEvent(): void { // This is working and this way we will get user's creds and compare them with db info
		console.log(this.loginForm.value)
		this.loginForm.reset();
	}


}
 