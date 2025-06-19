import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHighcharts } from 'highcharts-angular'

// FUNCIONAMIENTO DE PAGES ROUTES AND ROUTER LINK
import { routes } from './app.routes';
// PETICIONES HTTP A API
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
	provideHttpClient(),
	provideHighcharts()
  ]
};
