import { createSlice } from '@reduxjs/toolkit';
import { initialUserState, SliceStateUser } from '../../models/user.model';
import createProject from '../../services/project.service';
import { login } from '../../services/user.service';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (build) => {
    /** fulfilled */
    build.addCase(login.fulfilled, (state: SliceStateUser, action) => {
      state.user = action.payload;
    });
    build.addCase(createProject.fulfilled, (state: SliceStateUser, action) => {
      state.user.projects?.push(action.payload);
    });
  },
});

export default userSlice.reducer;
