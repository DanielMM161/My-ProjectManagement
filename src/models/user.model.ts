export interface SliceStateUser {
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  created?: Date;
}

export const emptyUser: User = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
};

export const initialUserState: SliceStateUser = {
  user: {
    id: 1,
    name: 'Daniel',
    email: 'danieltest@gmail.com',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150',
  },
};
