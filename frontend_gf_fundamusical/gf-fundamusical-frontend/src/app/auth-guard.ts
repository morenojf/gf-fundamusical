import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user-services/user-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

canActivate(): Observable<boolean> {
  return this.userService.validateSession().pipe(
    map((sessionData: any) => {
      if (sessionData.valid && sessionData.data.isActive === 'Activo') {
        return true;
      } else {
        alert('Usuario inactivo. Pongase en contacto con su administrador');
        this.router.navigate(['/']);
        return false;
      }
    }),
    catchError((error) => {
      if (error.status === 401) {
        alert('Sesión no válida. Por favor, inicia sesión nuevamente.');
        this.router.navigate(['/']);
      }
      return of(false);
    })
  );
}
}