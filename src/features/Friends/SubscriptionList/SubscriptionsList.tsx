import React from "react";
import styles from "../FriendsPage.module.css";
import SubscriptionsListItem from "../SubscriptionsListItem/SubscriptionsListItem";
import {selectFriends, useAppSelector} from "../../../app/hooks";

const SubscriptionsList: React.FC = () => {
  const users = useAppSelector(selectFriends)

  console.log("Пользователей в селекторе", users.length)

  if (!users.length) {
    return <h3>Вы еще ни на кого не подписаны</h3>
  }

  return (
    <div className={styles.friendsList}>
      {users.map((user) => {
        return (
          <SubscriptionsListItem
            key={user.userId}
            id={user.id}
            userId={user.userId}
            email={user.email}
            name={user.name}
            image={user.image}
          />
        );
      })}
    </div>
  );
};

export default SubscriptionsList;
