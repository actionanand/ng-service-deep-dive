import { Injectable, signal } from '@angular/core';

import { Task, TaskStatus } from '../tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(task: { title: string; description: string }) {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    this.tasks.update(oldTask => [...oldTask, newTask]);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update(oldtasks => oldtasks.map(task => (task.id === id ? { ...task, status } : task)));
  }
}
