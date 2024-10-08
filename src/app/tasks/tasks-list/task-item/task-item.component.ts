/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TASK_STATUS_OPTIONS_TOKEN, type Task, type TaskStatus } from '../../../models/task.model';
// import { TaskService } from '../../../services/task.service';
import { TaskServiceToken } from '../../../../main';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  task = input.required<Task>();

  // private taskServ = inject(TaskService);
  private taskServ = inject(TaskServiceToken);
  protected taskStatusOptnToken = inject(TASK_STATUS_OPTIONS_TOKEN);

  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.taskServ.updateTaskStatus(taskId, newStatus);
  }
}
