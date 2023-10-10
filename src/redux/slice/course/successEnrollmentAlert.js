/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const successEnrollmentAlert = createSlice({
  name: 'successEnrollmentAlert',
  initialState,
  reducers: {
    setSuccessAlertOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setSuccessAlertOpen } = successEnrollmentAlert.actions;
export default successEnrollmentAlert.reducer;
