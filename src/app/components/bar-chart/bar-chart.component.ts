import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { BarChartTabs, BarChartData } from 'src/interfaces/chart';
import * as moment from 'moment';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Chart, registerables } from 'chart.js';
import { BarChartEmpty } from 'src/interfaces/chartEmpty';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: false,
})
export class BarChartComponent implements OnInit {
  @Output() public scrollToTop = new EventEmitter();

  constructor(private global: GlobalService) {
    Chart.register(...registerables);
  }

  public selectedTab: BarChartTabs = 'daily';
  public startDate: string = moment().format('YYYY-01-01');
  public endDate: string = moment().format('YYYY-MM-10');
  public isSelectingDateRange: boolean = false;
  public chart!: any;
  private socket: any;

  ngOnInit() {
    this.initializeChart();
    this.loadChartData();
  }

  private initializeChart() {
    let ctx = document.getElementById('barChart') as HTMLCanvasElement;
    ctx.width = 650;
    ctx.height = 200;
    this.chart = new Chart(ctx, BarChartEmpty());
  }

  public async loadChartData(tab: BarChartTabs = 'daily') {
    try {
      if (this.socket) this.socket.disconnect();
      this.socket = io(environment.serverBaseUrl);
      this.socket.on('bar-chart-update', (data: BarChartData[]) => {
        this.updateChartData(tab, data);
      });
    } catch (error) {
      this.global.simpleAlert('Error', 'An error occurred while loading the chart data.');
    }
    this.isSelectingDateRange = false;
  }

  public onTabChange({ detail }: any) {
    this.loadChartData(detail.value);
  }

  private updateChartData(tab: BarChartTabs, data: BarChartData[]) {
    switch (tab) {
      case 'daily':
        this.updateDailyData(data);
        break;
      case 'monthly':
        this.updateMonthlyData(data);
        break;
      case 'custom':
        this.updateCustomData(data);
        break;
    }
  }

  private updateDailyData(data: BarChartData[]) {
    const daysInMonth = moment().daysInMonth();
    const daysList = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    let aggregatedData: any = {};
    data.forEach((item: BarChartData) => {
      const day = moment(item.date).date();
      const month = moment(item.date).month();
      const year = moment(item.date).year();
      if (!aggregatedData[day]) aggregatedData[day] = 0;
      if (month == moment().month() && year == moment().year()) {
        aggregatedData[day] += item.value;
      }
    });
    const seriesData = daysList.map((day) => aggregatedData[day] || 0);

    this.chart.data.labels = daysList.map((day) => day.toString());
    this.chart.data.datasets[0].data = seriesData;
    this.chart.update();
  }

  private updateMonthlyData(data: BarChartData[]) {
    let aggregatedData: any = {};
    data.forEach((item: BarChartData) => {
      const month = moment(item.date).format('YYYY-MM');
      const year = moment(item.date).year();
      if (!aggregatedData[month]) aggregatedData[month] = 0;
      if (year == moment().year()) aggregatedData[month] += item.value;
    });
    const monthsList = Object.keys(aggregatedData).map((month) => moment(month, 'YYYY-MM').format('MMM'));
    const orderedMonths = monthsList
      .sort((a, b) => moment(a, 'MMM').month() - moment(b, 'MMM').month())
      .filter((value, index, self) => self.indexOf(value) === index);
    const seriesData = orderedMonths.map((month) => aggregatedData[moment(month, 'MMM').format('YYYY-MM')]);

    this.chart.data.labels = orderedMonths;
    this.chart.data.datasets[0].data = seriesData;
    this.chart.update();
  }

  private updateCustomData(data: BarChartData[]) {
    const start = moment(this.startDate, 'YYYY-MM-DD');
    const end = moment(this.endDate, 'YYYY-MM-DD');
    const filteredData = data.filter((item: BarChartData) => {
      const itemDate = moment(item.date, 'YYYY-MM-DD');
      return itemDate.isBetween(start, end, 'day', '[]');
    });
    this.updateDailyData(filteredData);
    this.scrollToTop.emit();
  }

  get chartIsLoading(): boolean {
    return !this.chart?.data?.labels?.length;
  }
}
