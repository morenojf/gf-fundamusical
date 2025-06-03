import { Routes, UrlSegment } from '@angular/router';
import { LoginPage } from '../pages/Login/loginPage';
import { Dashboard } from '../pages/Dashboard/dashboard';
import { VistaGestion } from '../pages/vista-gestion/vista-gestion';
   
export const routes: Routes = [

	{path: '', component: LoginPage},
	{path: 'dashboard', component: Dashboard},
	{path: 'vista-gestion', component: VistaGestion}
];