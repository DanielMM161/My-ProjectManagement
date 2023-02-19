import { useState } from 'react';

import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TransferList from '../TransferList/TransferList';
import { User } from '../../models/user.model';

import './style.css';
import { Project } from '../../models/project.model';
import useUsers from '../../hooks/useUsers.hook';

interface IUpdateProjectProps {
  dialogTitle: string;
  project: Project;
  acceptOnClick: (values: Project) => void;
  cancelClick: () => void;
}

function UpdateProject({ dialogTitle, project, acceptOnClick, cancelClick }: IUpdateProjectProps) {
  const { name, description, users } = project;
  const [nameProject, setNameProject] = useState<string>(name);
  const [descriptionProject, setDescriptionProject] = useState<string>(description);
  const [usersIn, setUsersIn] = useState<User[]>(users);
  const { allUsers } = useUsers();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (usersIn.length > 0) {
      const projectUpdated: Project = {
        ...project,
        name: nameProject,
        description: descriptionProject,
        users: usersIn,
      };
      acceptOnClick(projectUpdated);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <DialogTitle>{dialogTitle}</DialogTitle>

      <DialogContent className="create-project-content" sx={{ width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Title
        </Typography>
        <TextField
          id="outlined-basic"
          className="title-field"
          value={nameProject}
          onChange={(e) => setNameProject(e.target.value)}
          onBlur={() => {
            if (nameProject === '') {
              setNameProject(name);
            }
          }}
        />

        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          sx={{
            width: 600,
            maxWidth: '100%',
          }}
          value={descriptionProject}
          onChange={(e) => setDescriptionProject(e.target.value)}
          onBlur={() => {
            if (descriptionProject === '') {
              setDescriptionProject(description);
            }
          }}
        />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Add Users</Typography>
          </AccordionSummary>

          {allUsers.length > 0 ? (
            <AccordionDetails>
              <TransferList allUsers={allUsers} usersIn={users} onUsersIn={(value) => setUsersIn(value)} />
            </AccordionDetails>
          ) : null}
        </Accordion>
      </DialogContent>
      {usersIn.length === 0 ? <p className="error">*You must to add at least one user.</p> : null}

      <Divider />

      <DialogActions>
        <Button
          onClick={() => {
            cancelClick();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Acept</Button>
      </DialogActions>
    </form>
  );
}

export default UpdateProject;
