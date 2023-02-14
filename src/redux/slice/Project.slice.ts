import { createSlice } from '@reduxjs/toolkit';

import { initialProjectState } from '../../models/project.model';

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {},
});

export default projectSlice.reducer;
