import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/services/task.service';

export const TaskServiceToken = new InjectionToken<TaskService>('task-service-token');

bootstrapApplication(AppComponent, {
  providers: [{ provide: TaskServiceToken, useClass: TaskService }],
}).catch(err => console.error(err));

// bootstrapApplication(AppComponent).catch(err => console.error(err));
