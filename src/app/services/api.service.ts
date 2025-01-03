import { Injectable } from '@angular/core';
import { BarChartData, PieChartData } from 'src/interfaces/chart';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getBarChartData(): Promise<BarChartData[]> {
    const response = await fetch('assets/data/bar-chart.json');
    return await response.json();
  }
  async getPieChartData(): Promise<PieChartData[]> {
    const response = await fetch('assets/data/pie-chart.json');
    return await response.json();
  }

  async getTaskData() {
    const response = await fetch('assets/data/task.json');
    return await response.json();
  }
}
