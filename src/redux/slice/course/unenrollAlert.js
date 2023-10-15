/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visibleCourseId: null,
};

const unenrollAlert = createSlice({
  name: 'unenrollAlert',
  initialState,
  reducers: {
    showUnenrollAlert: (state, action) => {
      state.visibleCourseId = action.payload;
    },
    hideUnenrollAlert: (state) => {
      state.visibleCourseId = null;
    },
  },
});

export const { showUnenrollAlert, hideUnenrollAlert } = unenrollAlert.actions;
export default unenrollAlert.reducer;
