import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';
import DashboardModel from '../../Models/dashboard';
import { SolicitudService } from '../../../services/solicitudes/solicitud-service';
import Solicitud from '../../Models/SolicitudOrigin';

@Component({
  selector: 'app-chart',
  imports: [HighchartsChartComponent],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class Chart implements OnInit {

  @Input() public dashboardInfo!: DashboardModel;

  solicitudes: Solicitud[] = [];
  chartOptions: Highcharts.Options = this.getDefaultChartOptions();
  chartConstructor: ChartConstructorType = 'chart';
  updateFlag = false;
  oneToOneFlag = true;

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.getSolicitudes();
  }

  // Getter para obtener la cantidad de solicitudes por mes
  get solicitudesByMonth(): number[] {
    if (!this.solicitudes) return Array(12).fill(0);
    const monthlyRequests = Array(12).fill(0);
    this.solicitudes.forEach(solicitud => {
      const month = new Date(solicitud.solicitudCreatedAt).getMonth();
      monthlyRequests[month] += 1;
    });
    return monthlyRequests;
  }

  // Obtener todas las solicitudes del usuario según el user ID
  getSolicitudes(): void {
    this.solicitudService.getSolicitudesByUserID().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.actualizarGrafico();
      },
      error: (err) => {
        console.log('Error al obtener solicitudes creadas por el usuario', err.error);
      }
    });
  }

  // Actualizar la configuración del gráfico con los datos actuales
  actualizarGrafico(): void {
    this.chartOptions = this.getDefaultChartOptions(this.solicitudesByMonth);
    this.updateFlag = true;
  }

  // Configuración por defecto del gráfico
  private getDefaultChartOptions(data: number[] = Array(12).fill(0)): Highcharts.Options {
    return {
      title: { text: 'Solicitudes/Mes' },
      xAxis: {
        categories: [
          'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.',
          'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'
        ]
      },
      yAxis: {
        title: { text: 'Total Solicitudes' }
      },
      series: [{
        name: 'Cantidad solicitud',
        data,
        type: 'column'
      }],
      credits: { enabled: false }
    };
  }
}