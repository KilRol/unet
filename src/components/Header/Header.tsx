import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {LogoutAction} from "../../reducers/Auth/Actions/LogoutAction";
import styles from "./Header.module.css";
import {LogoutDBAction} from "../../reducers/AuthDB/actions/LogoutDBAction";

const Header: React.FC = () => {
  const logoutHandler = (dispatch: Dispatch) => {
    localStorage.removeItem("user");
    return dispatch(LogoutAction());
  };
  const logoutDBHandler = (dispatch: Dispatch) => {
    localStorage.removeItem("userId");
    return dispatch(LogoutDBAction());
  };

  const dispatcher = useDispatch();

  const handler = (e: any) => {
    logoutHandler(dispatcher);
    logoutDBHandler(dispatcher);
  };

  return (
    <header className={styles.header}>
      <h1>UNet</h1>
      <NavLink to="/profile">Профиль</NavLink>
      <NavLink to="/friends">Друзья</NavLink>
      <NavLink to="/auth" onClick={handler}>
        Выйти
      </NavLink>
      <Outlet/>
    </header>
  );
};

export default Header;
