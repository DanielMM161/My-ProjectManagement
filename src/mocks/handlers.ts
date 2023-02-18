import projectHandler from './handlers/project.handler';
import userHandler from './handlers/user.handler';

const handlers = [...userHandler, ...projectHandler];

export default handlers;
