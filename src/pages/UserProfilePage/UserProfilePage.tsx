import React, {useEffect} from "react";
import styles from "./UserProfilePage.module.css";
import {useParams} from "react-router-dom";
import PostList from "../../features/Profile/PostList/PostList";
import {useDispatch} from "react-redux";
import {getUser} from "../../services/getUser";
import ProfileInfo from "../../features/Profile/ProfileInfo/ProfileInfo";
import {selectLoading, useAppSelector} from "../../app/hooks";

const UserProfilePage: React.FC<any> = () => {
  const loading = useAppSelector(selectLoading)
  const id = useParams().id as string;

  const dispatch = useDispatch();
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
      <h2>Профиль</h2>
      <div className={styles.profile}>
        <ProfileInfo/>
        <PostList id={id}/>
      </div>
    </>
  );
};

export default UserProfilePage;
