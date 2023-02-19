import { useCallback, useEffect, useState } from 'react';

import { Button, Dialog } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import CardProject from '../../components/CardProject/CardProject';
import CreateProject from '../../components/Forms/CreateProject';
import { IProjectRequest } from '../../services/request/project.request';
import Transition from '../../transitions/transition';
import { createProject, deleteProject, getProjectsByUser, updateProject } from '../../services/project.service';
import { removeProject } from '../../redux/slice/project.slice';

import UpdateProject from '../../components/Forms/UpdateProject';
import { Project } from '../../models/project.model';
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
  const [typeForm, setAllTypeForm] = useState<IStateForms>({
    title: '',
    form: FORMS.none,
  });
  const [projectSelected, setProjectSelected] = useState<Project>(projects[0]);

  const fetchUserProjects = useCallback(() => {
    dispatch(getProjectsByUser(user.id));
  }, [dispatch, user.id]);

  // TODO: Delete this part
  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  function showCreateProject() {
    setAllTypeForm({
      title: 'New Project',
      form: FORMS.create,
    });
    setShowModal(!showModal);
  }

  function showUpdateProject(project: Project) {
    setAllTypeForm({
      title: 'Update Project',
      form: FORMS.update,
    });
    setProjectSelected(project);
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

  function handleUpdateProject(project: Project) {
    dispatch(updateProject(project));
    setShowModal(!showModal);
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
      <Button variant="outlined" onClick={() => {}}>
        Update
      </Button>

      {projects.length > 0 &&
        projects.map((project) => (
          <CardProject key={project.name} project={project} onClick={() => showUpdateProject(project)} />
        ))}

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
          />
        ) : null}

        {showModal && typeForm.form === FORMS.update ? (
          <UpdateProject
            dialogTitle={typeForm.title}
            project={projectSelected}
            acceptOnClick={(project) => handleUpdateProject(project)}
            cancelClick={() => setShowModal(!showModal)}
          />
        ) : // UPDATE PROJECT COMPONENT
        null}
      </Dialog>
    </div>
  );
}

export default Dashboard;
