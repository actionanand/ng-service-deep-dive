import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');

  taskServ = inject(TaskService);

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.taskServ.allTasks();
      case 'open':
        return this.taskServ.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress':
        return this.taskServ.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskServ.allTasks().filter(task => task.status === 'DONE');
      default:
        return this.taskServ.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
