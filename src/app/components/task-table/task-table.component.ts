import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  standalone: false,
})
export class TaskTableComponent {
  public filter: string = 'Daily';
  public filters: string[] = ['Daily', 'Upcoming', 'Date Range'];
  private tasks: any[] = [];
  public startDateRange: string = moment().format('YYYY-MM-DD');
  public endDateRange: string = moment().format('YYYY-MM-DD');
  public dataRangeIsOpen: boolean = false;

  constructor(private api: ApiService) {
    this.getData();
  }

  public async getData() {
    this.tasks = await this.api.getTaskData();
  }

  public onFilterChange() {
    if (this.isDateRange) this.dataRangeIsOpen = true;
  }

  public loadFilteredTasks() {
    this.dataRangeIsOpen = false;
  }

  get filteredTasks() {
    switch (this.filter) {
      case 'Upcoming':
        return this.tasks.filter((task) => new Date(task.date) > new Date());
      case 'Date Range':
        const startDate = moment(this.startDateRange);
        const endDate = moment(this.endDateRange);
        return this.tasks.filter((task) => {
          const taskDate = moment(task.date, 'YYYY-MM-DD');
          return taskDate.isBetween(startDate, endDate, undefined, '[]');
        });
      default:
        return this.tasks.filter((task) => new Date(task.date).getDate() == new Date().getDate());
    }
  }

  get isDateRange() {
    return this.filter == 'Date Range';
  }
}
