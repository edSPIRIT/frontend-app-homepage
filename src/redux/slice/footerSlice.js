/* eslint-disable import/prefer-default-export */
import { getConfig } from '@edx/frontend-platform';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import baseURL from '../../../utils/baseURL.js';

// initial state
const initialState = {
  loading: false,
  description: '',
  logo: '',
  links: {},

};

// create action creator  - createAsyncThunk
// footer
export const footerAction = createAsyncThunk(
  'footer',
  async (
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      const res = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/footer-section/`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const footerSlice = createSlice({
  name: 'footer-section',
  initialState,
  extraReducers: (builder) => {
    // register
    builder.addCase(footerAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(footerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.description = action.payload;
    });
    builder.addCase(footerAction.rejected, (state, action) => {
      state.loading = false;
      state.description = action.payload;
    });
  },
});

// generate reducer
const footerReducer = footerSlice.reducer;

export default footerReducer;
