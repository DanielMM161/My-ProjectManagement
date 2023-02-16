import { rest } from 'msw';

import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { ICreateProjectRequest } from '../services/request/project.request';
import { IUserRequest } from '../services/request/user.request';

import projectsFake from './fakeData/project.fake';
import { usersFake } from './fakeData/user.fake';

const handlers = [
  /** Login User */
  rest.post('/login', async (req, res, ctx) => {
    const loginRequest: IUserRequest = await req.json();

    if (loginRequest.email === '' || loginRequest.password === '') {
      return res(ctx.status(400, 'Request failed with status code 400'));
    }

    const findUser: User | undefined = usersFake.find((item) => item.email === loginRequest.email);

    if (findUser === undefined) {
      return res(ctx.status(401, 'Unauthorized'));
    }

    return res(ctx.json(findUser));
  }),

  /** Get All Users */
  rest.get('/users', async (req, res, ctx) => res(ctx.json(usersFake))),

  /** Create Project */
  rest.post('/createProject', async (req, res, ctx) => {
    const request: ICreateProjectRequest = await req.json();

    const newProject: Project = {
      id: projectsFake.length,
      name: request.name,
      description: request.description,
      users: request.users,
      created: new Date(),
    };

    return res(ctx.json(newProject));
  }),
];

export default handlers;
