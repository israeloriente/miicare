import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApexChart, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexFill } from 'ng-apexcharts';
import { GlobalService } from 'src/app/services/global.service';
import { BarChartTabs, BarChartData } from 'src/interfaces/global';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: false,
})
export class BarChartComponent implements OnInit {
  @Output() public scrollToTop = new EventEmitter();

  constructor(private global: GlobalService, private api: ApiService) {}

  public selectedTab: BarChartTabs = 'daily';
  public startDate: string = '2024-12-01';
  public endDate: string = '2024-12-10';
  public isSelectingDateRange: boolean = false;
  public chartSeries: any[] = [];
  public chartCategories: string[] = [];
  public chartDetails: ApexChart = {
    type: 'bar',
    width: '700px',
    height: 200,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true,
    },
  };
  public chartColors: string[] = ['#2bb8f1', '#192a43', '#13556f'];
  public chartPlotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 10,
    },
  };
  public chartXAxis: ApexXAxis = {
    categories: this.chartCategories,
    labels: {
      rotate: -45,
      style: {
        fontSize: '12px',
      },
      formatter: (value) => value.toString(),
    },
    axisBorder: {
      show: true,
      color: '#ccc',
    },
    axisTicks: {
      show: true,
      color: '#ccc',
    },
  };
  public chartDataLabels: ApexDataLabels = {
    enabled: false,
  };
  public chartFill: ApexFill = {
    colors: this.chartColors,
  };

  ngOnInit() {
    setTimeout(() => {
      this.loadChartData();
    }, 1000);
  }

  public async loadChartData(tab: BarChartTabs = 'daily') {
    try {
      const data = await this.api.getBarChartData();
      this.updateChartData(tab, data);
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
    this.chartCategories = daysList.map((day) => day.toString());
    this.chartSeries = [
      {
        name: 'Daily Data',
        data: seriesData,
      },
    ];
    this.chartXAxis.categories = this.chartCategories;

    this.chartXAxis = {
      categories: this.chartCategories,
      title: {
        text: 'Day of the Month',
        style: {
          fontWeight: 'bold',
          color: '#333',
        },
      },
      labels: {
        formatter: (value) => {
          return value.toString();
        },
        style: {
          fontWeight: 'bold',
          colors: ['#333'],
        },
      },
    };
  }

  private updateMonthlyData(data: BarChartData[]) {
    let aggregatedData: any = {};
    data.forEach((item: BarChartData) => {
      const month = moment(item.date).format('YYYY-MM');
      const year = moment(item.date).year();
      if (!aggregatedData[month]) aggregatedData[month] = 0;
      if (year == moment().year()) aggregatedData[month] += item.value;
    });
    const monthsList = Object.keys(aggregatedData).map((month) => moment(month, 'YYYY-MM').format('MMM').toUpperCase());
    const orderedMonths = monthsList.sort((a, b) => moment(a, 'MMM').month() - moment(b, 'MMM').month());
    const seriesData = orderedMonths.map((month) => aggregatedData[moment(month, 'MMM').format('YYYY-MM')]);
    this.chartCategories = orderedMonths;
    this.chartSeries = [
      {
        name: 'Monthly Data',
        data: seriesData,
      },
    ];
    this.chartXAxis.categories = this.chartCategories;
    this.chartXAxis = {
      categories: this.chartCategories,
      labels: {
        formatter: (value) => {
          return value.toLowerCase();
        },
      },
    };
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
}
