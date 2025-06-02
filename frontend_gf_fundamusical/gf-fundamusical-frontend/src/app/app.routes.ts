import { Routes, UrlSegment } from '@angular/router';
import { LoginPage } from '../pages/Login/loginPage';
import { Dashboard } from '../pages/Dashboard/dashboard';
   
export const routes: Routes = [

	{path: '', component: LoginPage},
	{path: 'dashboard', component: Dashboard}
];