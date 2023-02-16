/* eslint-disable import/no-cycle */
import { Task } from './task.model';
import { User } from './user.model';

interface ProjectInitialState {
  projects: Project[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  todoTasks?: Task[];
  users: User[];
  created: Date;
}

export const initialProjectState: ProjectInitialState = {
  projects: [],
};
