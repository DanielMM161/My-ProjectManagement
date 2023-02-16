import { useEffect, useState } from 'react';

import { Button, Dialog } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import CardProject from '../../components/CardProject/CardProject';
import CreateProject from '../../components/Forms/CreateProject';
import { ICreateProjectRequest } from '../../services/request/project.request';
import { User } from '../../models/user.model';

import './style.css';
import { fetchAllUsers, login } from '../../services/user.service';
import createProject from '../../services/project.service';
import Transition from '../../transitions/transition';

function Dashboard() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { projects } = userState.user;
  const [showModal, setShowModal] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // TODO: Delete this part
  // useEffect(() => {
  //   dispatch(login({ email: 'danieltest@gmail.com', password: '123' }));
  // }, []);

  function showCreateProject() {
    dispatch(fetchAllUsers()).then((result) => {
      setAllUsers([...result.payload]);
      setShowModal(!showModal);
    });
  }

  function handleCreateProject(value: Omit<ICreateProjectRequest, 'users'>) {
    setShowModal(!showModal);
    const newProject: ICreateProjectRequest = {
      ...value,
      users: [userState.user],
    };
    dispatch(createProject(newProject));
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

      {projects?.map((project) => (
        <CardProject key={project.name} project={project} onClick={() => {}} />
      ))}

      {/* MODAL */}
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowModal(!showModal);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {showModal ? (
          <CreateProject
            title="New Project"
            acceptOnClick={(value) => handleCreateProject(value)}
            cancelClick={() => setShowModal(!showModal)}
            users={allUsers}
          />
        ) : null}
      </Dialog>
    </div>
  );
}

export default Dashboard;
