interface IProjectEntity {
  id: number;
  description: string;
  name: string;
  created: Date;
}

const projectEntity: IProjectEntity[] = [
  {
    id: 1,
    description: 'First Project',
    name: 'First Project',
    created: new Date(),
  },
  {
    id: 2,
    description: 'Second Project',
    name: 'Second Project',
    created: new Date(),
  },
  {
    id: 3,
    description: 'Third Project',
    name: 'Third Project',
    created: new Date(),
  },
  {
    id: 4,
    description: 'Fourth Project',
    name: 'Fourth Project',
    created: new Date(),
  },
  {
    id: 5,
    description: 'Fith Project',
    name: 'Fith Project',
    created: new Date(),
  },
];
export default projectEntity;
