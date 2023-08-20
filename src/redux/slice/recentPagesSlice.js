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
      const existingPageIndex = state.pages.findIndex(
        (page) => page.course_slug === courseMetaData.course_slug,
      );

      // Check if the page with the same course_slug already exists
      if (existingPageIndex !== -1) {
        // If it exists, remove it from the array
        state.pages = state.pages.filter(
          (page, index) => index !== existingPageIndex,
        );
      }

      // Create a new array with the updated values
      const updatedPages = [courseMetaData, ...state.pages.slice(0, MAX_RECENT_PAGES - 1)];

      // Update state.pages with the new array
      state.pages = updatedPages;

      localStorage.setItem('recentPages', JSON.stringify(state.pages));
    },
    removePage(state, action) {
      const courseSlug = action.payload;

      const index = state.pages.findIndex(
        (page) => page.course_slug === courseSlug,
      );
      if (index !== -1) {
        state.pages.splice(index, 1);
        localStorage.setItem('recentPages', JSON.stringify(state.pages));
      }
    },
    clearAllPages(state) {
      state.pages = [];
      localStorage.removeItem('recentPages');
    },
    loadPages(state) {
      const pages = localStorage.getItem('recentPages');
      if (pages) {
        state.pages = JSON.parse(pages);
      }
    },
  },
});

export const {
  addPage, removePage, clearAllPages, loadPages,
} = recentPagesSlice.actions;

export default recentPagesSlice.reducer;
