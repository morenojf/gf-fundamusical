import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    readonly LOGIN_URL = "http://localhost:3128/api/login"
	readonly VALIDATE_SESSION_URL = "http://localhost:3128/api/validate-session"
	readonly GET_ALL_USERS = "http://localhost:3128/api/get-all-users"
	readonly CHANGE_USER_INFO = "http://localhost:3128/api/change-user-info"
	readonly DEACTIVATE_USER_URL = "http://localhost:3128/api/deactivate-user"
	readonly ACTIVATE_USER_URL = "http://localhost:3128/api/activate-user"
	readonly CREATE_USER = "http://localhost:3128/api/create-user"
	readonly LOGOUT_URL = "http://localhost:3128/api/log-out"


  constructor(private http: HttpClient) { 
	// INICIAR VARIABLES
  }

authUser(logedInUser: any) {
return this.http.post<any>(this.LOGIN_URL, logedInUser, { withCredentials: true })
}

// este endpoint permitira al frontend saber si el usuario está logeado 
// mediante una peticion al backend que valide la sesion, 
// esto debido a que la cookie es HttpOnly por lo que solo puede ser leída por el servidor
validateSession() {
	return this.http.get<any>(this.VALIDATE_SESSION_URL, { withCredentials: true })
}

getAllUsers(){
	return this.http.get<any>(this.GET_ALL_USERS)
}

changeUserInfo(usuario: any){
	return this.http.patch<any>(this.CHANGE_USER_INFO, usuario)
}

deactivateUser(user: any){
	return this.http.patch<any>(this.DEACTIVATE_USER_URL, user)
}

activateUser(user: any){
	return this.http.patch<any>(this.ACTIVATE_USER_URL, user)
}

createUser(userInfo: any){
	return this.http.post<any>(this.CREATE_USER, userInfo)
}

logout(){
	return this.http.get<any>(this.LOGOUT_URL, { withCredentials: true })
}

}
