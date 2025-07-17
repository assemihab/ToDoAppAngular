export type TaskStatus = 'pending' | 'completed';

export interface todo {
  id: string;
  name: string;
  priority: number;
  status: TaskStatus;
}

export interface todoNoId {
  name: string;
  priority: number;
  status: TaskStatus;
}
