import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api.service';
import { PieChartData } from 'src/interfaces/global';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pie-chart',
  template: `<ion-card>
    <ion-card-header>
      <ion-card-title>Daily Intake Overview</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <apx-chart [series]="chartSeries" [chart]="chartDetails" [responsive]="chartResponsive" [colors]="chartColors" [labels]="chartLabels">
      </apx-chart>
    </ion-card-content>
  </ion-card> `,
  standalone: false,
})
export class PieChartComponent implements OnInit {
  public chartSeries: ApexNonAxisChartSeries = [];
  public chartLabels: string[] = [];
  public chartColors: string[] = ['#2bb8f1', '#192a43', '#13556f'];
  private socket: any;

  public chartDetails: ApexChart = {
    type: 'pie',
    width: '100%',
    animations: {
      enabled: false,
    },
  };
  public chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {},
        legend: {
          position: 'bottom',
        },
      },
    },
  ];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.socket = io(environment.serverBaseUrl);
    this.socket.on('pie-chart-update', (data: PieChartData[]) => {
      this.chartLabels = data.map((item: PieChartData) => item.category);
      this.chartSeries = data.map((item: PieChartData) => item.value);
    });
  }
}
