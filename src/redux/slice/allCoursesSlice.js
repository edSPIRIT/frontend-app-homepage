import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'recent',
};

const sortAllCoursesSlice = createSlice({
  name: 'sortEnrollment',
  initialState,
  reducers: {
    recentCourses: (state, action) => {
      state.value = 'recent';
    },
    ascendingCourses: (state, action) => {
      state.value = 'ascending';
    },
    descendingCourses: (state, action) => {
      state.value = 'dscending';
    },
  },
});

export const { recentCourses, ascendingCourses, descendingCourses } = sortAllCoursesSlice.actions;
export default sortAllCoursesSlice.reducer;
