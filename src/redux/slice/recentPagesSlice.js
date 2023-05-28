/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const MAX_RECENT_PAGES = 3;

const initialState = {
  pages: [],
};
const recentPagesSlice = createSlice({
  name: 'recentPages',
  initialState,
  reducers: {
    addPage(state, action) {
      const courseMetaData = action.payload;
      const index = state.pages.indexOf(courseMetaData.course_slug);
      if (index !== -1) {
        state.pages.splice(index, 1);
      }
      state.pages.unshift(courseMetaData);
      if (state.pages.length > MAX_RECENT_PAGES) {
        state.pages.pop();
      }
      localStorage.setItem('recentPages', JSON.stringify(state.pages));
    },
    loadPages(state) {
      const pages = localStorage.getItem('recentPages');
      if (pages) {
        state.pages = JSON.parse(pages);
      }
    },
  },
});

export const { addPage, loadPages } = recentPagesSlice.actions;

export default recentPagesSlice.reducer;
