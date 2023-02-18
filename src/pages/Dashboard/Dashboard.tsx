import { useEffect, useState } from 'react';

import { Button, Dialog } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import CardProject from '../../components/CardProject/CardProject';
import CreateProject from '../../components/Forms/CreateProject';
import { IProjectRequest } from '../../services/request/project.request';
import { User } from '../../models/user.model';
import { fetchAllUsers } from '../../services/user.service';
import Transition from '../../transitions/transition';
import { createProject, deleteProject, getProjectsByUser, updateProject } from '../../services/project.service';
import { removeProject } from '../../redux/slice/project.slice';

import './style.css';

enum FORMS {
  none,
  create,
  update,
}

interface IStateForms {
  title: string;
  form: FORMS;
}

function Dashboard() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { user } = userState;
  const projectsState = useAppSelector((state) => state.projcts);
  const { projects } = projectsState;
  const [showModal, setShowModal] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [typeForm, setAllTypeForm] = useState<IStateForms>({
    title: '',
    form: FORMS.none,
  });
  const [indexProject, setIndexProject] = useState<number>(0);

  // TODO: Delete this part
  // useEffect(() => {
  //   const fetchUserProjects = () => {
  //     dispatch(getProjectsByUser(user.id));
  //   };
  //   fetchUserProjects();
  // }, []);

  function showCreateProject() {
    setAllTypeForm({
      title: 'New Project',
      form: FORMS.create,
    });
    dispatch(fetchAllUsers()).then((result) => {
      setAllUsers([...result.payload]);
      setShowModal(!showModal);
    });
  }

  function showUpdateProject() {
    setAllTypeForm({
      title: 'Update Project',
      form: FORMS.update,
    });
    setIndexProject(1);
    setShowModal(!showModal);
  }

  function handleCreateProject(request: IProjectRequest) {
    setShowModal(!showModal);
    const newProject: IProjectRequest = request;
    dispatch(createProject(newProject));
  }

  function handleDeleteProject() {
    dispatch(deleteProject(1)).then((result) => {
      if (result) {
        dispatch(removeProject(1));
      }
    });
  }

  function handleUpdateProject(request: IProjectRequest) {
    console.log(request);
    dispatch(updateProject(request));
  }

  return (
    <div className="dashboard">
      <Button
        variant="outlined"
        onClick={() => {
          showCreateProject();
        }}
      >
        Create Project
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          handleDeleteProject();
        }}
      >
        Delete
      </Button>
      <Button variant="outlined" onClick={() => showUpdateProject()}>
        Update
      </Button>

      {projects.length > 0 &&
        projects.map((project) => <CardProject key={project.name} project={project} onClick={() => {}} />)}

      {/* MODAL CREATE */}
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowModal(!showModal);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {showModal && typeForm.form === FORMS.create ? (
          <CreateProject
            dialogTitle={typeForm.title}
            acceptOnClick={(value) => handleCreateProject(value)}
            cancelClick={() => setShowModal(!showModal)}
            users={allUsers}
          />
        ) : null}

        {showModal && typeForm.form === FORMS.update ? (
          <div>Update</div>
        ) : // UPDATE PROJECT COMPONENT
        null}
      </Dialog>
    </div>
  );
}

export default Dashboard;
