import React, {useEffect} from "react";
import {selectLoading, selectUserId, useAppDispatch, useAppSelector} from "../../app/hooks";
import styles from "./ProfilePage.module.css";
import {Link} from "react-router-dom";
import PostCreateForm from "../../features/Profile/PostCreateForm/PostCreateForm";
import PostList from "../../features/Profile/PostList/PostList";
import {getUser} from "../../services/getUser";
import ProfileInfo from "../../features/Profile/ProfileInfo/ProfileInfo";

const ProfilePage: React.FC = () => {
  const loading = useAppSelector(selectLoading)
  const id = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(id)(dispatch);
  }, [dispatch, id])

  if (loading) {
    return (
      <h3>Загружаем профиль</h3>
    )
  }
  return (
    <>
      <div className={styles.profileEdit}>
        <h2>Профиль</h2>
        <Link to="/edit">Редактировать</Link>
      </div>
      <div className={styles.profile}>
        <ProfileInfo/>
        <PostCreateForm/>
        <PostList id={id}/>
      </div>
    </>
  );
};

export default ProfilePage;
