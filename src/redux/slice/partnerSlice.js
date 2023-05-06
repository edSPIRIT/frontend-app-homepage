import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'recent',
};

const sortPartnersSlice = createSlice({
  name: 'sortPartners',
  initialState,
  reducers: {
    recentPartners: (state, action) => {
      state.value = 'recent';
    },
    ascendingPartners: (state, action) => {
      state.value = 'ascending';
    },
    descendingPartners: (state, action) => {
      state.value = 'descending';
    },

  },
});

export const { recentPartners, ascendingPartners, descendingPartners } = sortPartnersSlice.actions;
export default sortPartnersSlice.reducer;
