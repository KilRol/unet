import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store";
import {createSelector} from "@reduxjs/toolkit";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const selectSelf = (state: RootState) => state;

export const selectUser = createSelector(selectSelf, (state) => {
  return state.reducer.AuthReducer.user;
});

export const selectUserId = createSelector(selectSelf, (state) => {
  return state.reducer.AuthDBReducer.userId;
});

export const selectPosts = createSelector(selectSelf, (state) => {
  return state.reducer.PostReducer.posts;
});

export const selectUserProfile = createSelector(selectSelf, (state) => {
  return state.reducer.UserReducer.user;
});

export const selectLoading = createSelector(selectSelf, (state) => {
  return state.reducer.LoadingReducer.loading;
});

export const selectUserList = createSelector(selectSelf, (state) => {
  return state.reducer.UserListReducer.users;
});

export const selectFriends = createSelector(selectSelf, (state) => {
  return state.reducer.FriendsReducer.users;
});

export const selectRegisterStatus = createSelector(selectSelf, (state) => {
  return state.reducer.RegisterReducer.registerSuccess;
});

export const selectRegisterError = createSelector(selectSelf, (state) => {
  return state.reducer.RegisterReducer.failureStatus;
});

export const selectAuthStatus = createSelector(selectSelf, (state) => {
  return state.reducer.AuthReducer.authSuccess;
});

export const selectAuthError = createSelector(selectSelf, (state) => {
  return state.reducer.AuthReducer.authError;
});


