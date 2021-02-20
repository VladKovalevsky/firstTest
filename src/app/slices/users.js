
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../services/UserService';
import { loadingStates } from '../constants';

const usersAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
  sortComparer: ({ id: id1 }, { id: id2 }) => id1 - id2,
});

const initialState = usersAdapter.getInitialState({
  hasMore: true,
  status: loadingStates.PENDING,
  error: null,
});

export const getUsers = createAsyncThunk(
  'users',
  async (options) => {
    const response = await UserService.fetchUsers(options);
    return response;
  },
  {
    condition: (opts, { getState }) => {
      const { users: { status } } = getState();
      if (status === 'LOADING') return false;
      return true;
    },
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = loadingStates.LOADING;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      const { data, hasMore } = payload;
      usersAdapter.addMany(state, data);
      state.hasMore = hasMore;
      state.status = loadingStates.SUCCEEDED;
    },
    [getUsers.rejected]: (state, { error }) => {
      state.error = error;
      state.status = loadingStates.FAILED;
    },
  },
});

const usersSelectors = usersAdapter.getSelectors(
  ({ users }) => users,
);

export const {
  selectIds: selectUsersIds,
  selectById: selectUserById,
} = usersSelectors;

export const selectUsersStatus = ({ users: { status } }) => status;

export default usersSlice.reducer;
