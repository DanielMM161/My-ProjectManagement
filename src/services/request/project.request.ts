import { User } from '../../models/user.model';

export interface IProjectRequest {
  id?: number;
  name: string;
  description: string;
  users: User[];
}
