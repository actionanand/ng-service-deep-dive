/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  private taskServ = inject(TaskService);

  onAddTask(title: string, description: string) {
    this.formEl()?.nativeElement.reset();

    this.taskServ.addTask({ title, description });
  }
}
