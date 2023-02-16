import { User } from '../../models/user.model';

export interface ICreateProjectRequest {
  name: string;
  description: string;
  users: User[];
}
