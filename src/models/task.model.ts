/* eslint-disable import/no-cycle */
import { User } from './user.model';

interface TaskInitialState {
  tasks: Task[];
}

export enum Status {
  open,
  inProgress,
  resolved,
  closed,
}

export enum Priority {
  low,
  medium,
  high,
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate?: Date;
  status: Status;
  priority: Priority;
  user: User;
  created: Date;
}

export const initialTaskState: TaskInitialState = {
  tasks: [],
};
