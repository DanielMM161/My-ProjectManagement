import { createSlice } from '@reduxjs/toolkit';
import { initialUserState, SliceStateUser } from '../../models/user.model';

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
  },
});

export default userSlice.reducer;
