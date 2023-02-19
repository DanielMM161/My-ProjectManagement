import { rest } from 'msw';

import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { IProjectRequest } from '../../services/request/project.request';
import projectEntity from '../entities/project.entity';
import { userEntity } from '../entities/user.entity';
import { IUserProject, userProjectsEntity } from '../entities/user_project.entity';

let userProjects = userProjectsEntity;
let projects = projectEntity;

function getAllProjectsWithUser(allProjectsId: number[]) {
  const allProjects = allProjectsId.map<Project>((id) => {
    const projectIndex = projects.findIndex((item) => item.id === id);
    const project = projects[projectIndex];
    const allUsersByProject = userProjects.filter((item) => item.projectId === id).map((item) => item.userId);
    const users: User[] = [];
    allUsersByProject.forEach((userId) => {
      const userIndex = userEntity.findIndex((item) => item.id === userId);
      users.push(userEntity[userIndex]);
    });
    return {
      ...project,
      users: [...users],
    } as Project;
  });
  return allProjects;
}

const projectHandler = [
  /** Get All Projects */
  rest.get('/projects', async (req, res, ctx) => {
    const allProjectsId = [...new Set(userProjects.map((item) => item.projectId))];
    return res(ctx.json(getAllProjectsWithUser(allProjectsId)));
  }),
  /** Get Projects By User */
  rest.get('/projects/:userId', async (req, res, ctx) => {
    const { userId } = req.params;

    const index = userProjects.findIndex((item) => item.userId === Number(userId));
    const allProjectsByUserIdS = userProjects
      .filter((item) => item.userId === Number(userId))
      .map((item) => item.projectId);

    if (index !== -1) {
      return res(ctx.json(getAllProjectsWithUser(allProjectsByUserIdS)));
    }
    return res(ctx.json([]));
  }),
  /** Create Project */
  rest.post('/createProject', async (req, res, ctx) => {
    const request: IProjectRequest = await req.json();

    const newProject: Project = {
      id: projects.length + 1,
      name: request.name,
      description: request.description,
      created: new Date(),
      users: request.users,
    };

    projects.push(newProject);
    request.users.forEach((item) => {
      const userProject: IUserProject = {
        id: userProjects.length + 1,
        userId: item.id,
        projectId: newProject.id,
        created: new Date(),
      };
      userProjects.push(userProject);
    });

    return res(ctx.json(newProject));
  }),
  /** Update Project */
  rest.put('/updateProject/:id', async (req, res, ctx) => {
    const projectId = req.params.id;
    const request: IProjectRequest = await req.json();
    if (projectId !== '' || projectId !== null) {
      const findProject = projects.filter((item) => item.id === Number(projectId));

      if (findProject.length === 0) {
        return res(ctx.status(404, 'Not Found'));
      }

      if (request.users.length > 0) {
        userProjects = userProjects.filter((item) => item.projectId !== Number(projectId));
        request.users.forEach((user) => {
          const userProject: IUserProject = {
            id: userProjects.length + 1,
            userId: user.id,
            projectId: findProject[0].id,
            created: new Date(),
          };
          userProjects.push(userProject);
        });
      }

      const project: Project = {
        ...findProject[0],
        name: request.name !== '' ? request.name : findProject[0].name,
        description: request.description !== '' ? request.description : findProject[0].description,
        users: request.users,
      };

      return res(ctx.json(project));
    }

    return res(ctx.status(404, 'Invalid Id'));
  }),
  /** Delete Project */
  rest.delete('/project/:id', async (req, res, ctx) => {
    const projectId = req.params.id;
    if (projectId !== '' || projectId !== null) {
      const id = Number(projectId);
      projects = projects.filter((item) => item.id !== id);
      userProjects = userProjects.filter((item) => item.projectId !== id);
      return res(ctx.json(true));
    }

    return res(ctx.status(404, 'Invalid Id'));
  }),
];

export default projectHandler;
