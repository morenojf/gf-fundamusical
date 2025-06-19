import { Routes, UrlSegment } from '@angular/router';
import { LoginPage } from '../pages/Login/loginPage';
import { Dashboard } from '../pages/Dashboard/dashboard';
import { VistaGestion } from '../pages/vista-gestion/vista-gestion';
import { PeriodoDetails } from '../pages/periodo-details/periodo-details';
   
export const routes: Routes = [

	{path: '', component: LoginPage},
	{path: 'dashboard/:id', component: Dashboard},
	{path: 'vista-gestion', component: VistaGestion},
	{path: 'solicitudes-list/:id', component: PeriodoDetails}
];