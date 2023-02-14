import { createSlice } from '@reduxjs/toolkit';
import { initialUserState } from '../../models/user.model';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
});

export default userSlice.reducer;
