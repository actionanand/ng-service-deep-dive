import { Component, computed, inject, signal, Inject } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskServiceToken } from '../../../main';
import { TaskStatusOptionProvider, TASK_STATUS_OPTIONS_TOKEN, type TaskStatusOptions } from '../task.model';
// import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionProvider],
  /*
  providers: [{
    provide: TASK_STATUS_OPTIONS_TOKEN,
    useValue: TaskStatusOptionsData
  }],*/
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');

  // private taskServ = inject(TaskService);
  private taskServ = inject(TaskServiceToken);
  // protected taskStatusOptnToken = inject(TASK_STATUS_OPTIONS_TOKEN);

  constructor(@Inject(TASK_STATUS_OPTIONS_TOKEN) protected taskStatusOptnToken: TaskStatusOptions) {}

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
