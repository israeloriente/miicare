import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PieChartData } from 'src/interfaces/chart';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Chart, registerables } from 'chart.js';
import { PieChartEmpty } from 'src/interfaces/chartEmpty';

@Component({
  selector: 'app-pie-chart',
  template: `<ion-card>
    <ion-card-header>
      <ion-card-title>Daily Intake Overview</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <canvas id="pieChart"></canvas>
    </ion-card-content>
  </ion-card> `,
  standalone: false,
})
export class PieChartComponent implements OnInit {
  public chart!: any;
  private socket: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.initializeChart();
    this.getData();
  }

  private initializeChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, PieChartEmpty());
  }

  getData() {
    if (this.socket) this.socket.disconnect();
    this.socket = io(environment.serverBaseUrl);
    this.socket.on('pie-chart-update', (data: PieChartData[]) => {
      this.chart.data.labels = data.map((item: PieChartData) => item.category);
      this.chart.data.datasets[0].data = data.map((item: PieChartData) => item.value);
      this.chart.update();
    });
  }
}
