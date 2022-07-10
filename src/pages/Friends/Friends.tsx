import React from "react";
import {NavLink, Outlet} from "react-router-dom";
import styles from "../Page.module.css";

const Friends: React.FC = () => {
  return (
    <>
      <div className={styles.friendsMenu}>
        <NavLink to="">Мои друзья</NavLink>
        <NavLink to="find">Найти друзей</NavLink>
        <NavLink to="subscriptions">Подписки</NavLink>
        <NavLink to="requests">Заявки в друзья</NavLink>
      </div>
      <Outlet/>
    </>
  );
};

export default Friends;
