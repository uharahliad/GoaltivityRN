import {createAsyncThunk} from '@reduxjs/toolkit';
import {getMe} from './auth';
import users from '../../api/users';

export const editUser = createAsyncThunk(
  'auth/update',
  async (data, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.id;
      const res = await users.updateUser({data}, userId);

      console.log('Update res =======>', res.data);

      thunkAPI.dispatch(getMe());
      return {};
    } catch (error) {
      console.log(22222222, error.message, error.response);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
