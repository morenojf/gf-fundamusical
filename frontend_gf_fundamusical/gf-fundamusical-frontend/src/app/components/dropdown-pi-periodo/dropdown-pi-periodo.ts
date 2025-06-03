import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-pi-periodo',
  imports: [],
  templateUrl: './dropdown-pi-periodo.html',
  styleUrl: './dropdown-pi-periodo.css'
})
export class DropdownPIPeriodo implements OnInit {

  // Variable para controlar qué tarjeta del acordeón está activa
  activeAccordion: string | null = '2025'; // '2025' para que inicie abierta, o null para iniciar todos cerrados

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes inicializar datos o lógica cuando el componente se carga
  }

  // Método para alternar la visibilidad del contenido del acordeón
  toggleAccordion(year: string): void {
    this.activeAccordion = this.activeAccordion === year ? null : year;
  }
}
