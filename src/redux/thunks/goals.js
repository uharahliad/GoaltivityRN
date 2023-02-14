import {createAsyncThunk} from '@reduxjs/toolkit';
import goals from '../../api/goals';

export const getGoals = createAsyncThunk(
  'goals/fetch',
  async (data, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.id;
      const res = await goals.getGoals(userId);

      console.log('GOALS res =======>', res);
      return res.data.rows;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
