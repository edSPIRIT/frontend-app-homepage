/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

const searchPageSlice = createSlice({
  name: 'searchPage',
  initialState,
  reducers: {
    incrementSearchPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { incrementSearchPage } = searchPageSlice.actions;
export default searchPageSlice.reducer;
