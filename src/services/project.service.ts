import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICreateProjectRequest } from './request/project.request';

const createProject = createAsyncThunk('createProject', async (request: ICreateProjectRequest) => {
  const response = await axios.post('/createProject', {
    name: request.name,
    description: request.description,
    users: request.users,
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
});

export default createProject;
