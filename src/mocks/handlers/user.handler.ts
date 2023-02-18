import { rest } from 'msw';

import { User } from '../../models/user.model';
import { IUserRequest } from '../../services/request/user.request';
import { userEntity } from '../entities/user.entity';

const userHandler = [
  /** Login User */
  rest.post('/login', async (req, res, ctx) => {
    const loginRequest: IUserRequest = await req.json();

    if (loginRequest.email === '' || loginRequest.password === '') {
      return res(ctx.status(400, 'Request failed with status code 400'));
    }

    const findUser: User | undefined = userEntity.find((item) => item.email === loginRequest.email);

    if (findUser === undefined) {
      return res(ctx.status(404, 'Not Found'));
    }

    return res(ctx.json(findUser));
  }),
  /** Get All Users */
  rest.get('/users', async (req, res, ctx) => res(ctx.json(userEntity))),
];

export default userHandler;
