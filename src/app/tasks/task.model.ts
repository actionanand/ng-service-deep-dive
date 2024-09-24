import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[];

export const TASK_STATUS_OPTIONS_TOKEN = new InjectionToken<TaskStatusOptions>('task-status-options');

export const TaskStatusOptionsData: TaskStatusOptions = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress',
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed',
  },
];

export const TaskStatusOptionProvider: Provider = {
  provide: TASK_STATUS_OPTIONS_TOKEN,
  useValue: TaskStatusOptionsData,
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
