import {createSlice} from '@reduxjs/toolkit';
import {getGoals} from '../thunks/goals';

const initialState = {
  goalsData: [],
  loading: false,
  errorMessage: '',
};

export const slice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setNewChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getGoals.pending, state => {
        state.loading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goalsData = action.payload;
        state.loading = false;
      });
  },
});

export const {setNewChannels} = slice.actions;

export default slice.reducer;
