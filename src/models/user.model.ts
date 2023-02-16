/* eslint-disable import/no-cycle */
import { Project } from './project.model';
import { Task } from './task.model';

export interface SliceStateUser {
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  projects?: Project[];
  tasks?: Task[];
  created?: Date;
}

export const emptyUser: User = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
  projects: [],
  tasks: [],
};

export const initialUserState: SliceStateUser = {
  user: emptyUser,
};
