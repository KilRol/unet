import React, {useEffect} from "react";
import FriendsRequestsList from "../../features/Friends/FriendsRequestsList/FriendsRequestsList";
import {selectLoading, selectUserId, useAppSelector} from "../../app/hooks";
import {useDispatch} from "react-redux";
import {getFriends} from "../../services/getFriends";

const FriendsRequestsPage: React.FC<any> = () => {
  const userId = useAppSelector(selectUserId);
  const loading = useAppSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    getFriends("requests", userId)(dispatch)
  }, [dispatch, userId]);


  return (
    <>
      <h2>Заявки в друзья</h2>
      {loading ? (<h3>Получаем список заявок</h3>) : (<FriendsRequestsList/>)}
    </>
  );
};

export default FriendsRequestsPage;
