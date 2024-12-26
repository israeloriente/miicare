import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api.service';
import { PieChartData } from 'src/interfaces/global';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  standalone: false,
})
export class PieChartComponent implements OnInit {
  public chartSeries: ApexNonAxisChartSeries = [];
  public chartLabels: string[] = [];
  public chartColors: string[] = ['#2bb8f1', '#192a43', '#13556f'];

  public chartDetails: ApexChart = {
    type: 'pie',
    width: '100%',
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
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  async getData() {
    const data = await this.apiService.getPieChartData();
    this.chartSeries = data.map((item: PieChartData) => item.value);
    this.chartLabels = data.map((item: PieChartData) => item.category);
  }
}
