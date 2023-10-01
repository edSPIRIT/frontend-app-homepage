/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const activateAlertSlice = createSlice({
  name: 'activateAlert',
  initialState,
  reducers: {
    setActivateAlert: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setActivateAlert } = activateAlertSlice.actions;
export default activateAlertSlice.reducer;
