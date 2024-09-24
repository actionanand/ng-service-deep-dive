/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { TaskServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // constructor(private taskServ: TaskService) {}
  constructor(@Inject(TaskServiceToken) private taskServ: TaskService) {}

  onAddTask(title: string, description: string) {
    this.formEl()?.nativeElement.reset();

    if (!title.trim()) {
      return;
    }

    this.taskServ.addTask({ title: title.trim(), description });
  }
}
