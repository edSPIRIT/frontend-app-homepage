/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: null,
  },
  reducers: {
    setToastMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const { setToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
