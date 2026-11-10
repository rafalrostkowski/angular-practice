import { Component } from '@angular/core';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';

@Component({
  selector: 'app-root',
  imports: [TaskList, TaskForm],
  template: `
    <h1>Task Board</h1>
    <app-task-list />
    <app-task-form />
  `,
})
export class App {}
