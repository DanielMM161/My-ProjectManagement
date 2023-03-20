import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { emptyUser } from '../models/user.model';
import { LoginRequest, RegisterRequest } from './request/user.request';
import BASE_URL from './../utils/constants';

const getProfile = createAsyncThunk('session', async () => {
  let token = JSON.parse(localStorage.getItem('token') ?? "");  
  const response = await axios.get(`${BASE_URL}/auths/profile`, {
    headers: {
      Authorization : `Bearer ${token}`
    }
  });
      
  if (response.status === 200) {      
    return response.data;
  }

  return emptyUser;
});

const login = createAsyncThunk('login', async (payload: LoginRequest) => {
  const response = await axios.post(`${BASE_URL}/auths/login`, {
    email: payload.email,
    password: payload.password,
  });
    
  if (response.status === 200) {
    localStorage.setItem('token', JSON.stringify(response.data['token']));        
    return response.data;
  }

  return emptyUser;
});

const register = createAsyncThunk('register', async (payload: RegisterRequest) => {
  const response = await axios.post(`${BASE_URL}/users`, {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password
  });
    
  if (response.status === 200) { 
    return response.data;
  }

  return null;
});

const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  const response = await axios.get('/users');

  if (response.status === 200) {
    return response.data;
  }

  return [];
});

export { login, fetchAllUsers, getProfile, register };
