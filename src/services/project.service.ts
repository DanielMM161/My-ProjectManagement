import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../utils/constants';
import { IProjectRequest } from './request/project.request';

const getProjectsByUser = createAsyncThunk('fetchProjectsByUser', async (userId: number) => {
  const response = await axios.get(`/projects/${userId}`);

  if (response.status === 200) {
    return response.data;
  }

  return [];
});

const fetchProjects = createAsyncThunk('fetchAllProjects', async () => {
  const response = await axios.get(`${BASE_URL}/projects`);

  if (response.status === 200) {
    return response.data;
  }

  return [];
});

const createProject = createAsyncThunk('createProject', async (request: IProjectRequest) => {
  const response = await axios.post(`${BASE_URL}/createProject`, {
    name: request.name,
    description: request.description,
    users: request.users,
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
});

const updateProject = createAsyncThunk('updateProject', async (request: IProjectRequest) => {
  const response = await axios.put(`/updateProject/${request.id}`, {
    name: request.name,
    description: request.description,
    users: request.users,
  });

  if (response.status === 200) {
    return response.data;
  }
  return null;
});

const deleteProject = createAsyncThunk('deleteProject', async (id: number) => {
  const response = await axios.delete(`/deleteProject/${id}`);

  if (response.status === 200) {
    return response.data;
  }

  return null;
});

export { createProject, updateProject, deleteProject, getProjectsByUser, fetchProjects };
