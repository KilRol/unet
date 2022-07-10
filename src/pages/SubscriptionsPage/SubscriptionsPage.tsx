import React, {useEffect} from "react";
import {selectLoading, selectUserId, useAppSelector} from "../../app/hooks";
import SubscriptionsList from "../../features/Friends/SubscriptionList/SubscriptionsList";
import {useDispatch} from "react-redux";
import {getFriends} from "../../services/getFriends";

const SubscriptionsPage: React.FC = () => {
  const userId = useAppSelector(selectUserId);
  const loading = useAppSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    getFriends("subscriptions", userId)(dispatch)
  }, [dispatch, userId]);

  return (
    <>
      <h2>Подписки</h2>
      {loading ? (<h3>Загружаем ваши подписки</h3>) : (<SubscriptionsList/>)}
    </>
  );
};

export default SubscriptionsPage;
