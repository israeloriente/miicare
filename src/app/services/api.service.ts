import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getChartData() {
    const response = await fetch('assets/data/chart.json');
    return await response.json();
  }
}
