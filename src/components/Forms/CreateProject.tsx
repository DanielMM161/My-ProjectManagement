import { SubmitHandler, useForm } from 'react-hook-form';

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

import { ICreateProjectRequest } from '../../services/request/project.request';
import TransferList from '../TransferList/TransferList';
import { User } from '../../models/user.model';

import './style.css';

interface ICreateProjectProps {
  title: string;
  users: User[];
  acceptOnClick: (values: Omit<ICreateProjectRequest, 'users'>) => void;
  cancelClick: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

function CreateProject({ title, users, acceptOnClick, cancelClick }: ICreateProjectProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    acceptOnClick({ name: data.title, description: data.description });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent className="create-project-content" sx={{ width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Title
        </Typography>
        <TextField {...register('title', { required: true })} id="outlined-basic" className="title-field" />
        {errors.description && <p className="error">*Description is required.</p>}

        <Typography variant="h5" gutterBottom>
          Description
        </Typography>
        <TextField
          {...register('description', { required: true })}
          id="outlined-multiline-static"
          multiline
          rows={4}
          sx={{
            width: 600,
            maxWidth: '100%',
          }}
        />
        {errors.description && <p className="error">*Description is required.</p>}

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Add Users</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <TransferList users={users} />
          </AccordionDetails>
        </Accordion>
      </DialogContent>

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

export default CreateProject;
