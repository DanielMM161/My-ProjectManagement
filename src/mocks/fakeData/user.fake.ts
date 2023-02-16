/* eslint-disable import/no-cycle */
import { User } from '../../models/user.model';

export const userFake: User = {
  id: 1,
  name: 'Daniel',
  email: 'danieltest@gmail.com',
  avatar: 'https://api.lorem.space/image/face?w=150&h=150',
  projects: [],
  tasks: [],
  created: new Date(),
};

export const usersFake: User[] = [
  userFake,
  {
    id: 2,
    name: 'Ira',
    email: 'ira@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
  {
    id: 3,
    name: 'Fran',
    email: 'fran@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
  {
    id: 4,
    name: 'Juanjo',
    email: 'juanjo@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
  {
    id: 5,
    name: 'Javi',
    email: 'javi@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
  {
    id: 6,
    name: 'Leire',
    email: 'leire@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
  {
    id: 7,
    name: 'Cas',
    email: 'cas@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
  {
    id: 8,
    name: 'Ayrton',
    email: 'ayrton@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    projects: [],
    tasks: [],
    created: new Date(),
  },
];
