import { Component } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  standalone: false,
})
export class PieChartComponent {
  public chartSeries: ApexNonAxisChartSeries = [44, 55, 13];
  public chartLabels: string[] = ['Hydration', 'Nutrition', 'Other'];
  public chartColors: string[] = ['#2bb8f1', '#192a43', '#13556f'];

  public chartDetails: ApexChart = {
    type: 'pie',
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
}
