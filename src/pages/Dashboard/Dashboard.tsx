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
import DialogInfoAction from '../../components/DialogContent/DialogInfoAction';

enum FORMS {
  none,
  create,
  update,
  delete,
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
  const [showDialog, setShowDialog] = useState(false);
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
    setShowDialog(!showDialog);
  }

  function showEditProject(project: Project) {
    setAllTypeForm({
      title: 'Update Project',
      form: FORMS.update,
    });
    setProjectSelected(project);
    setShowDialog(!showDialog);
  }

  function showDeleteProject(project: Project) {
    setAllTypeForm({
      title: 'Delete Project',
      form: FORMS.delete,
    });
    setProjectSelected(project);
    setShowDialog(!showDialog);
  }

  function handleCreateProject(request: IProjectRequest) {
    setShowDialog(!showDialog);
    const newProject: IProjectRequest = request;
    dispatch(createProject(newProject));
  }

  function handleDeleteProject() {
    setShowDialog(!showDialog);
    dispatch(deleteProject(projectSelected.id)).then((result) => {
      if (result) {
        dispatch(removeProject(projectSelected.id));
      }
    });
  }

  function handleUpdateProject(project: Project) {
    dispatch(updateProject(project));
    setShowDialog(!showDialog);
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

      {projects.length > 0 &&
        projects.map((project) => (
          <CardProject
            key={project.name}
            project={project}
            onClick={() => {}}
            editProject={() => showEditProject(project)}
            deleteProject={() => showDeleteProject(project)}
          />
        ))}

      {/* DIALOG CREATE */}
      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowDialog(!showDialog);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {showDialog && typeForm.form === FORMS.create ? (
          <CreateProject
            dialogTitle={typeForm.title}
            acceptOnClick={(value) => handleCreateProject(value)}
            cancelClick={() => setShowDialog(!showDialog)}
          />
        ) : null}

        {showDialog && typeForm.form === FORMS.update ? (
          <UpdateProject
            dialogTitle={typeForm.title}
            project={projectSelected}
            acceptOnClick={(project) => handleUpdateProject(project)}
            cancelClick={() => setShowDialog(!showDialog)}
          />
        ) : null}

        {showDialog && typeForm.form === FORMS.delete ? (
          <DialogInfoAction
            dialogTitle={typeForm.title}
            contentText="Are you sure that you want to delete this project ?"
            onClickAccept={() => handleDeleteProject()}
            onClickCancel={() => setShowDialog(!showDialog)}
          />
        ) : null}
      </Dialog>
    </div>
  );
}

export default Dashboard;
