import React, {useEffect} from "react";
import {selectLoading, selectUserId, useAppSelector} from "../../app/hooks";
import FriendsList from "../../features/Friends/FriendsList/FriendsList";
import {useDispatch} from "react-redux";
import {getFriends} from "../../services/getFriends";

const FriendsPage: React.FC = () => {
  const userId = useAppSelector(selectUserId);
  const loading = useAppSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    getFriends("friends", userId)(dispatch)
  }, [dispatch, userId]);

  return (
    <>
      <h2>Друзья</h2>
      {loading ? (<h3>Получаем список ваших друзей</h3>) : (<FriendsList/>)}
    </>
  );
};

export default FriendsPage;
