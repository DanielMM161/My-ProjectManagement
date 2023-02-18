export interface IUserProject {
  id: number;
  userId: number;
  projectId: number;
  created: Date;
}

export const userProjectsEntity: IUserProject[] = [
  {
    id: 1,
    userId: 1,
    projectId: 1,
    created: new Date(),
  },
  {
    id: 2,
    userId: 1,
    projectId: 2,
    created: new Date(),
  },
  {
    id: 3,
    userId: 1,
    projectId: 3,
    created: new Date(),
  },
  {
    id: 4,
    userId: 1,
    projectId: 4,
    created: new Date(),
  },
  {
    id: 5,
    userId: 2,
    projectId: 1,
    created: new Date(),
  },
  {
    id: 6,
    userId: 3,
    projectId: 1,
    created: new Date(),
  },
  {
    id: 4,
    userId: 4,
    projectId: 1,
    created: new Date(),
  },
];
