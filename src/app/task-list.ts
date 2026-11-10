import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { interval } from 'rxjs';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-list',
  template: `
    <div>
      <button (click)="filter.set('all')">All</button>
      <button (click)="filter.set('open')">Open</button>
      <button (click)="filter.set('done')">Done</button>
      <small>Clock: {{ now() }}</small>
    </div>

    @if (loading) {
      <p>Loading...</p>
    }

    <ul>
      @for (task of visible(); track $index) {
        <li [class.done]="task.done">
          <input type="checkbox" [checked]="task.done" (change)="service.toggle(task.id)" />
          <span class="title">{{ task.title }}</span>
          <span [class]="task.priority">{{ task.priority }}</span>
          <small>due {{ task.due }}</small>
          <span [innerHTML]="render(task.notes)"></span>
          <button (click)="service.remove(task.id)">x</button>
        </li>
      } @empty {
        <li>No tasks</li>
      }
    </ul>
  `,
})
export class TaskList implements OnInit {
  protected readonly service = inject(TaskService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly filter = signal<'all' | 'open' | 'done'>('all');
  protected readonly visible = signal<Task[]>([]);
  protected readonly now = signal(new Date().toLocaleTimeString());
  protected loading = true;

  constructor() {
    effect(() => {
      const filter = this.filter();
      const all = this.service.tasks();
      this.visible.set(
        all.filter((t) => {
          if (filter === 'open') return !t.done;
          if (filter === 'done') return (t.done = true);
          return true;
        }),
      );
    });
  }

  ngOnInit() {
    this.service.load().subscribe(() => (this.loading = false));
    interval(1000).subscribe(() => this.now.set(new Date().toLocaleTimeString()));
  }

  protected render(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
