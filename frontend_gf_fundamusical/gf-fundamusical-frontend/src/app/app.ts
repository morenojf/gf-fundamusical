import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gf-fundamusical-frontend';
  	userId = 1;
	userName = 'nucleo_auyama';
	email = 'nucleo.auyama@fundamusical.com';
	userPass = 'admin';
	rol = 'USER';
}
