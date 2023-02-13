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
    setSignIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, state => {
      // state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(getMe.pending, state => {
      state.loading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(editUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = null;
    });
  },
});

export const {setUser} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value

export default authSlice.reducer;
