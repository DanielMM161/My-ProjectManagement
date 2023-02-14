import CardProject from '../../components/CardProject/CardProject';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import './style.css';

function Dashboard() {
  const users: User[] = [
    {
      id: 1,
      name: 'Daniel',
      email: '',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
      projects: [],
      created: new Date(),
    },
    {
      id: 2,
      name: 'Ira',
      email: '',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
      projects: [],
      created: new Date(),
    },
    {
      id: 3,
      name: 'Fran',
      email: '',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
      projects: [],
      created: new Date(),
    },
    {
      id: 4,
      name: 'Alvaro',
      email: '',
      avatar: 'https://api.lorem.space/image/face?w=150&h=150',
      projects: [],
      created: new Date(),
    },
  ];
  const projects: Project[] = [
    { id: 1, name: 'Project Test', description: 'Description Test', todoTasks: [], users, created: new Date() },
  ];

  return (
    <div className="dashboard">
      {projects.map((project) => (
        <CardProject project={project} onClick={() => {}} key={project.name} />
      ))}
    </div>
  );
}

export default Dashboard;
