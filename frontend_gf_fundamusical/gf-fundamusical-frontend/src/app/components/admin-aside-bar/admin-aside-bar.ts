import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-services/user-service';

@Component({
  selector: 'app-admin-aside-bar',
  imports: [RouterLink],
  templateUrl: './admin-aside-bar.html',
  styleUrl: './admin-aside-bar.css',
})
export class AdminAsideBar {
  userInfo!: any;
  showUserDropdown = false;

  constructor(public userService: UserService, public router: Router) {
    this.getUserInfo();
  }

  getUserInfo(): any {
    this.userService.validateSession().subscribe({
      next: (data) => {
        // data recibe un json con
        // { valid: true,
        //   data: {userId: 1, userName: "nombreUsuario", userEmail: "email@usuario.com", userPass: "contraseñaUsuario", userRol: "ADMIN"}}
        this.userInfo = data.data;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  logOut() {
    this.userService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/']);
		localStorage.clear()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
