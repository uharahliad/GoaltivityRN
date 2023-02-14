import {createSlice} from '@reduxjs/toolkit';
import {getMe, login, logout, register} from '../thunks/auth';
import {editUser} from '../thunks/user';

// Define the initial state
const initialState = {
  user: null,
  loading: false,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    setSignIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, state => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getMe.pending, state => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(editUser.pending, state => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  },
});

export const {setUser, clearUser} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value

export default authSlice.reducer;
