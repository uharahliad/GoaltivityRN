import {configureStore} from '@reduxjs/toolkit';
import signInSlice from '../reducers/signInSlice';
import authSlice from '../reducers/authSlice';
import modalSlice from '../reducers/modalSlice';
import channelSlice from '../reducers/channelSlice';
import goalsSlice from '../reducers/goalsSlice';

export const store = configureStore({
  reducer: {
    signIn: signInSlice,
    auth: authSlice,
    goals: goalsSlice,
    modalOpen: modalSlice,
    channnels: channelSlice,
  },
});
