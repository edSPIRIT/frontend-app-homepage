/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const sortSearchSlice = createSlice({
  name: 'searchSort',
  initialState,
  reducers: {
    setSearchSortValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchSortValue } = sortSearchSlice.actions;
export default sortSearchSlice.reducer;
