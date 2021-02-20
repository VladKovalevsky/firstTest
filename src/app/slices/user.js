import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import UserService from '../services/UserService';
import { loadingStates } from '../constants';

const initialState = {
  data: {},
  status: loadingStates.PENDING,
  error: null,
};

export const getUser = createAsyncThunk(
  'user',
  async (username) => {
    const response = await UserService.fetchUser(username);
    return response;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser() {
      return initialState;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.status = loadingStates.LOADING;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = loadingStates.SUCCEESS;
    },
    [getUser.rejected]: (state, { error }) => {
      state.error = error;
      state.status = loadingStates.FAILED;
    },
  },
});



export const { removeUser } = userSlice.actions;

export const selectCurrentUser = ({ user: { data } }) => data;
export const selectUserStatus = ({ user: { status } }) => status;

export default userSlice.reducer;
