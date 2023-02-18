import { Avatar, Card, Typography, CardContent } from '@mui/material';

import { Project } from '../../models/project.model';

import './style.css';

interface ICardProjectProps {
  project: Project;
  onClick: () => void;
}

function CardProject({ project, onClick }: ICardProjectProps) {
  const { name, description, users } = project;

  return (
    <Card onClick={() => onClick} sx={{ maxWidth: 345, cursor: 'pointer' }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ marginBottom: 15 }}>
          {description}
        </Typography>

        <div className="users-container">
          {users
            .map((item) => <Avatar alt={item.name} src={item.avatar} sx={{ width: 24, height: 24 }} key={item.name} />)
            .slice(0, 4)}
        </div>

        <Typography variant="overline" display="block" gutterBottom>
          {/* {`${todoTasks?.length ?? 0} Total Tasks`} */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardProject;
