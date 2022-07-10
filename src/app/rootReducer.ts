import {combineReducers} from "@reduxjs/toolkit";
import {AuthReducer} from "../reducers/Auth/AuthReducer";
import {AuthDBReducer} from "../reducers/AuthDB/AuthDBReducer";
import {PostReducer} from "../reducers/Post/PostReducer";
import {UserReducer} from "../reducers/User/UserReducer";
import {LoadingReducer} from "../reducers/LoadingReducer/LoadingReducer";
import {UserListReducer} from "../reducers/UserList/UserListReducer";
import {FriendsReducer} from "../reducers/Friends/FriendsReducer";
import {RegisterReducer} from "../reducers/RegisterReducer/RegisterReducer";

export default combineReducers({
  AuthReducer,
  AuthDBReducer,
  PostReducer,
  UserReducer,
  LoadingReducer,
  UserListReducer,
  FriendsReducer,
  RegisterReducer,
});
