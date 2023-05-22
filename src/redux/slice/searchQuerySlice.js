/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchSuggestionValue: '',
  searchQueryValue: '',
};

const searchSlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    setSearchSuggestionValue: (state, action) => {
      state.searchSuggestionValue = action.payload;
    },
    setSearchQueryValue: (state, action) => {
      state.searchQueryValue = action.payload;
    },
  },
});

export const { setSearchSuggestionValue, setSearchQueryValue } = searchSlice.actions;
export default searchSlice.reducer;
