import { Avatar, Card, Typography, CardContent, Menu, MenuItem, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useState } from 'react';
import { Project } from '../../models/project.model';

import './style.css';

interface ICardProjectProps {
  project: Project;
  editProject: () => void;
  deleteProject: () => void;
  onClick: () => void;
}

function CardProject({ project, editProject, deleteProject, onClick }: ICardProjectProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { name, description, users } = project;

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEdit() {
    handleClose();
    editProject();
  }

  function handleDelete() {
    handleClose();
    deleteProject();
  }

  return (
    <Card onClick={() => {}} sx={{ maxWidth: 345, cursor: 'pointer' }}>
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

        <footer className="footer-card">
          <Typography variant="overline" display="block" gutterBottom>
            {/* {`${todoTasks?.length ?? 0} Total Tasks`} */}
          </Typography>

          <IconButton
            aria-label="options"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </footer>
      </CardContent>
    </Card>
  );
}

export default CardProject;
