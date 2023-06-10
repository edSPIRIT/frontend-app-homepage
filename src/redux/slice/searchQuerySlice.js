/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search_string: '',
  language_codes: [],
  instructors: [],
  partners: [],
  subjects: [],
};

const searchSlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.search_string = action.payload;
    },
    setSearchLanguageCodes: (state, action) => {
      state.language_codes = action.payload;
    },
    setSearchInstructors: (state, action) => {
      state.instructors = action.payload;
    },
    setSearchPartners: (state, action) => {
      state.partners = action.payload;
    },
    setSearchSubject: (state, action) => {
      state.subjects = action.payload;
    },
    resetSearchFilters: (state) => {
      state.search_string = '';
      state.language_codes = [];
      state.instructors = [];
      state.partners = [];
      state.subjects = [];
    },
  },
});

export const {
  setSearchString,
  setSearchLanguageCodes,
  setSearchInstructors,
  setSearchPartners,
  setSearchSubject,
  resetSearchFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
