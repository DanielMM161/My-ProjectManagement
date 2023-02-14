import { createSlice } from '@reduxjs/toolkit';
import { initialTaskState } from '../../models/task.model';

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialTaskState,
  reducers: {},
});

export default taskSlice.reducer;
