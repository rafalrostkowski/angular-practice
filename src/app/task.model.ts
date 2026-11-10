export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  notes: string;
  due: string; // ISO date, e.g. 2026-11-20
}
