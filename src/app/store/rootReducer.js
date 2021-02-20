import { combineReducers } from "redux"
import userSlice from '../slices/user'
import usersSlice from '../slices/users'

export default combineReducers({
  user: userSlice,
  users: usersSlice
})
