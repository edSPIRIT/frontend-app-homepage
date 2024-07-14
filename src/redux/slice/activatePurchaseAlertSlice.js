/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const activatePurchaseAlertSlice = createSlice({
  name: 'activatePurchaseAlert',
  initialState,
  reducers: {
    setActivatePurchaseAlert: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setActivatePurchaseAlert } = activatePurchaseAlertSlice.actions;
export default activatePurchaseAlertSlice.reducer;
