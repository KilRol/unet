import React, {useEffect} from "react";

import NewFriendsList from "../../features/Friends/NewFriendsList/NewFriendsList";
import getAllUsers from "../../services/getAllUsers";
import {selectLoading, selectUserId, useAppDispatch, useAppSelector} from "../../app/hooks";

const NewFriendsPage: React.FC<any> = () => {
  const userId = useAppSelector(selectUserId);
  const loading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    getAllUsers(userId)(dispatch)
  }, [dispatch, userId]);

  return (
    <>
      <h2>Пользователи UNet</h2>
      {loading ? <h3>Получаем список пользователей</h3> : <NewFriendsList/>}
    </>
  );
};

export default NewFriendsPage;
