import { Routes, UrlSegment } from '@angular/router';
import { LoginPage } from '../pages/Login/loginPage';
import { Dashboard } from '../pages/Dashboard/dashboard';
import { ModuloIngresos } from '../pages/modulo-ingresos/modulo-ingresos';
import { IngresosDetails } from '../pages/periodo-details/periodo-details';
import { AuthGuard } from './auth-guard';
import { ModuloEgresos } from '../pages/modulo-egresos/modulo-egresos';
import { UsersList } from '../pages/users-list/users-list';
import { CrearUsuarioNucleo } from '../pages/crear-usuario-nucleo/crear-usuario-nucleo';
import { AdminDashboard } from '../pages/admin-dashboard/admin-dashboard';
import { ModuloInformes } from '../pages/modulo-informes/modulo-informes';
import { CrearNucleo } from '../pages/crear-nucleo/crear-nucleo';
import { GestionCg } from '../pages/gestion-cg/gestion-cg';
   
export const routes: Routes = [

	{path: '', component: LoginPage},
	{path: 'admin-dashboard', component: AdminDashboard, canActivate: [AuthGuard]},
	{path: 'dashboard/:id', component: Dashboard, canActivate: [AuthGuard]},
	{path: 'ingresos', component: ModuloIngresos, canActivate: [AuthGuard]},
	{path: 'egresos', component: ModuloEgresos, canActivate: [AuthGuard]},
	{path: 'informes', component: ModuloInformes, canActivate: [AuthGuard]},
	{path: 'ingresos-list/:mes', component: IngresosDetails, canActivate: [AuthGuard]},
	{path: 'egresos-list/:mes', component: IngresosDetails, canActivate: [AuthGuard]},
	{path: 'informes-list/:mes', component: IngresosDetails, canActivate: [AuthGuard]},
	{path: 'users-list', component: UsersList, canActivate: [AuthGuard]},
	{path: 'crear-usuario', component: CrearUsuarioNucleo, canActivate: [AuthGuard]},
	{path: 'crear-nucleo', component: CrearNucleo, canActivate: [AuthGuard]},
	{path: 'crear-cg', component: GestionCg, canActivate: [AuthGuard]},

];