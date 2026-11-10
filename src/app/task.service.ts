import { Injectable, signal } from '@angular/core';
import { Observable, map, tap, timer } from 'rxjs';
import { Task } from './task.model';

const SEED: Task[] = [
  { id: 1, title: 'Prepare interview', done: false, priority: 'high', notes: '<b>Angular 21</b> signals', due: '2026-11-12' },
  { id: 2, title: 'Review PR #42', done: true, priority: 'medium', notes: 'Check the <i>service</i>', due: '2026-11-09' },
  { id: 3, title: 'Write tests', done: false, priority: 'low', notes: 'Vitest', due: '2026-11-30' },
];

@Injectable({ providedIn: 'root' })
export class TaskService {
  readonly tasks = signal<Task[]>([]);

  load(): Observable<Task[]> {
    // simulates an HTTP call
    return timer(300).pipe(
      map(() => SEED),
      tap((tasks) => this.tasks.set(tasks)),
    );
  }

  add(task: Omit<Task, 'id'>) {
    const list = this.tasks();
    list.push({ ...task, id: list.length + 1 });
    this.tasks.set(list);
  }

  remove(id: number) {
    this.tasks.update((list) => list.filter((t) => t.id !== id));
  }

  toggle(id: number) {
    const task = this.tasks().find((t) => t.id === id);
    if (task) {
      task.done = !task.done;
    }
  }
}
