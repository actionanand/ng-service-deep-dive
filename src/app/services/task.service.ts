import { inject, signal } from '@angular/core';
// import { Injectable } '@angular/core';

import { Task, TaskStatus } from '../tasks/task.model';
import { LogService } from './log.service';

/*
@Injectable({
  providedIn: 'root',
})
*/
export class TaskService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  private logServ = inject(LogService);

  addTask(task: { title: string; description: string }) {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    this.tasks.update(oldTask => [...oldTask, newTask]);
    this.logServ.log(`Added a new task with the title '${task.title}' & ID '${newTask.id}'`);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    let isCurrentStatusSame;

    this.tasks().forEach(task => {
      if (task.status === status) {
        isCurrentStatusSame = true;
      }
    });

    if (isCurrentStatusSame || status === 'OPEN') {
      return;
    }

    this.tasks.update(oldtasks => oldtasks.map(task => (task.id === id ? { ...task, status } : task)));
    this.logServ.log(id + "'s task changed to " + status);
  }
}
