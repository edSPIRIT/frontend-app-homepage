import { configureStore } from '@reduxjs/toolkit';
import sortPartners from '../slice/partnerSlice';
import sortAllCourses from '../slice/allCoursesSlice';
import searchModal from '../slice/searchSlice';
import searchPage from '../slice/searchPageSlice';

const store = configureStore({
  reducer: {
    sortPartners,
    sortAllCourses,
    searchModal,
    searchPage,
  },
});

export default store;
