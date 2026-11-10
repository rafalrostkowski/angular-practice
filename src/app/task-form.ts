import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()">
      <input name="title" placeholder="Title" [(ngModel)]="model.title" />
      <select name="priority" [(ngModel)]="model.priority">
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <input name="due" type="date" [(ngModel)]="model.due" />
      <textarea name="notes" placeholder="Notes (HTML allowed)" [(ngModel)]="model.notes"></textarea>
      <button type="submit">Add task</button>
    </form>
  `,
})
export class TaskForm {
  private readonly service = inject(TaskService);

  model: any = { title: '', priority: 'low', due: '', notes: '' };

  submit() {
    this.service.add({ ...this.model, done: false });
    this.model = { title: '', priority: 'low', due: '', notes: '' };
  }
}
