/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'recent',
};

const sortPartnersSlice = createSlice({
  name: 'sortPartners',
  initialState,
  reducers: {
    setSortValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSortValue } = sortPartnersSlice.actions;

export default sortPartnersSlice.reducer;
