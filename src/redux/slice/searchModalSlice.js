/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    setSearchModal: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setSearchModal } = searchModalSlice.actions;
export default searchModalSlice.reducer;
