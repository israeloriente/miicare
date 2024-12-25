import { Component } from '@angular/core';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  standalone: false,
})
export class TaskTableComponent {
  filter: string = 'Daily';
  filters: string[] = ['Daily', 'Upcoming', 'Date Range'];

  tasks = [
    { id: 1, name: 'Task 1', date: '2024-12-25' },
    { id: 2, name: 'Task 2', date: '2024-12-26' },
    { id: 3, name: 'Task 3', date: '2024-12-27' },
  ];

  get filteredTasks() {
    if (this.filter === 'Upcoming') {
      return this.tasks.filter((task) => new Date(task.date) > new Date());
    } else if (this.filter === 'Date Range') {
      return this.tasks;
    }
    return this.tasks;
  }
}
