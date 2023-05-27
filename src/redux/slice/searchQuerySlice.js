/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search_string: '',
  language_code: '',
  instructors: [],
  partner: [],
  subject: [],
};

const searchSlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.search_string = action.payload;
    },
    setSearchLanguageCode: (state, action) => {
      state.language_code = action.payload;
    },
    setSearchInstructors: (state, action) => {
      state.instructors = action.payload;
    },
    setSearchPartner: (state, action) => {
      state.partner = action.payload;
    },
    setSearchSubject: (state, action) => {
      state.subject = action.payload;
    },
    resetSearchFilters: (state) => {
      state.search_string = '';
      state.language_code = '';
      state.instructors = [];
      state.partner = [];
      state.subject = [];
    },
  },
});

export const {
  setSearchString,
  setSearchLanguageCode,
  setSearchInstructors,
  setSearchPartner,
  setSearchSubject,
  resetSearchFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
