/* eslint-disable import/no-cycle */
import { Project } from './project.model';

interface SliceStateUser {
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  projects: Project[];
  created: Date;
}

export const initialUserState: SliceStateUser = {
  user: null,
};
