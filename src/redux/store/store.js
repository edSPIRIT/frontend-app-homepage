import { configureStore } from '@reduxjs/toolkit';
import footerReducer from '../slice/footerSlice';
import sortPartners from '../slice/partnerSlice';
import sortAllCourses from '../slice/allCoursesSlice';

// store
const store = configureStore({
  reducer: {
    sortPartners,
    sortAllCourses,
    // footer: footerReducer,
    // accounts: accountsReducer,
    // transactions: transactionsReducer,
  },
});

export default store;
