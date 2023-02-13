import {configureStore} from '@reduxjs/toolkit';
import signInSlice from '../reducers/signInSlice';
import authSlice from '../reducers/authSlice';
import modalSlice from '../reducers/modalSlice';
import channelSlice from '../reducers/channelSlice';

export const store = configureStore({
  reducer: {
    signIn: signInSlice,
    auth: authSlice,
    modalOpen: modalSlice,
    channnels: channelSlice,
  },
});
