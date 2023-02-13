import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '../../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    const res = await auth.getMe();
    console.log('Me =====>', res.data);

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await auth.login(data);

    console.log('LOGIN res =======>', res.data);

    await EncryptedStorage.setItem('token', res.data.token);
    thunkAPI.dispatch(getMe());
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const token = await auth.register(data);

      console.log('REGISTER TOKEN =======>', token, token.data);

      await EncryptedStorage.setItem('token', token.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', () => {
  auth.logout();
});
