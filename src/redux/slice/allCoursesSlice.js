/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'recent',
};

const sortAllCoursesSlice = createSlice({
  name: 'sortEnrollment',
  initialState,
  reducers: {
    setCourseSortValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCourseSortValue } = sortAllCoursesSlice.actions;
export default sortAllCoursesSlice.reducer;
