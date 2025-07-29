import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user-services/user-service';

@Component({
  selector: 'loginForm',
  imports: [ReactiveFormsModule],
  templateUrl: './loginForm.html',
  styleUrl: './loginForm.css',
})
export class LoginForm {
  loginForm: FormGroup;
  userName: FormControl;
  password: FormControl;
  showPassword = false;
  logedInUser!: any;

  constructor(public userService: UserService, private router: Router) {
    this.userName = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      email: this.userName,
      userPass: this.password,
    });
  }

  // Ocultar contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Boton de ingresar -- este metodo envia los datos del formulario al backend
  // si el usuario existe y la contraseña es correcta lo redirige al dashboard
  loginEvent(): void {
    this.logedInUser = this.loginForm.value;
    this.userService.authUser(this.logedInUser).subscribe({
      next: (data) => {

        if (data.validUser[0].rol === 'USER') {
          this.router.navigate(['/dashboard/', data.validUser[0].userId]);
        } else {
			this.router.navigate(['/admin-dashboard'])
        }
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Usuario o contraseña incorrecto');
        } else {
          alert('Ocurrió un error inesperado');
        }
      },
    });

    // resetea los datos del formulario una vez le das al boton login
    this.loginForm.reset();
  }
}
