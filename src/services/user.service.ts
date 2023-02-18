import { createAsyncThunk } from '@reduxjs/toolkit';

import axios, { AxiosResponse } from 'axios';

import { emptyUser } from '../models/user.model';
import { IUserRequest } from './request/user.request';

let response: AxiosResponse<any, any>;

const login = createAsyncThunk('login', async (payload: IUserRequest) => {
  response = await axios.post('/login', {
    email: payload.email,
    password: payload.password,
  });

  if (response.status === 200) {
    return response.data;
  }

  return emptyUser;
});

const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  response = await axios.get('/users');

  if (response.status === 200) {
    return response.data;
  }

  return [];
});

export { login, fetchAllUsers };
