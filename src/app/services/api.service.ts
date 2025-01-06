import { Injectable } from '@angular/core';
import { TaskTableData } from 'src/interfaces/chart';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  async getTaskData(): Promise<TaskTableData[]> {
    const response = await fetch('assets/data/task.json');
    return await response.json();
  }
}
