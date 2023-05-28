import { configureStore } from '@reduxjs/toolkit';
import sortPartners from '../slice/partnerSlice';
import sortAllCourses from '../slice/allCoursesSlice';
import searchModal from '../slice/searchModalSlice';
import searchPage from '../slice/searchPageSlice';
import searchFilters from '../slice/searchQuerySlice';
import recentPages from '../slice/recentPagesSlice';

const store = configureStore({
  reducer: {
    sortPartners,
    sortAllCourses,
    searchModal,
    searchPage,
    searchFilters,
    recentPages,
  },
});

export default store;