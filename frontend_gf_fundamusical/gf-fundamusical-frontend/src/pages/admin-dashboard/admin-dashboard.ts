import { Header } from '../../app/components/header/header';
import { NucleoInfo } from '../../app/components/nucleo-info/nucleo-info';
import { Component } from '@angular/core';
import { UserService } from '../../services/user-services/user-service';
import { AdminResume } from '../../app/components/admin-resume/admin-resume';
import { AdminAsideBar } from '../../app/components/admin-aside-bar/admin-aside-bar';


@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminAsideBar, Header, NucleoInfo, AdminResume],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

	userRol!: string

	constructor(public userService: UserService) {
		this.getUserInfo();
	}

	getUserInfo(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con 
		// { valid: true, 
		//   data: {userId: 1, userName: "nombreUsuario", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.userRol = data.data.userRol;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}
