/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    openSearchModal: (state) => {
      state.open = true;
    },
    closeSearchModal: (state) => {
      state.open = false;
    },
  },
});

export const { openSearchModal, closeSearchModal } = searchModalSlice.actions;
export default searchModalSlice.reducer;
