export interface IUserEntity {
  id: number;
  name: string;
  email: string;
  avatar: string;
  created?: Date;
}

export const userEntity: IUserEntity[] = [
  {
    id: 1,
    name: 'Daniel',
    email: 'danieltest@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 2,
    name: 'Ira',
    email: 'ira@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 3,
    name: 'Fran',
    email: 'fran@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 4,
    name: 'Juanjo',
    email: 'juanjo@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 5,
    name: 'Javi',
    email: 'javi@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 6,
    name: 'Leire',
    email: 'leire@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 7,
    name: 'Cas',
    email: 'cas@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
  {
    id: 8,
    name: 'Ayrton',
    email: 'ayrton@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
    created: new Date(),
  },
];
