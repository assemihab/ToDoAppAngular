export type TaskStatus = 'pending' | 'completed';

export interface todo {
  name: string;
  priority: number;
  status: TaskStatus;
}
