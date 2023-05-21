import { configureStore } from '@reduxjs/toolkit';
import sortPartners from '../slice/partnerSlice';
import sortAllCourses from '../slice/allCoursesSlice';
import searchModal from '../slice/searchModalSlice';
import searchPage from '../slice/searchPageSlice';
import searchQuery from '../slice/searchQuerySlice';

const store = configureStore({
  reducer: {
    sortPartners,
    sortAllCourses,
    searchModal,
    searchPage,
    searchQuery,
  },
});

export default store;
