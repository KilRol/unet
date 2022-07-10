import React from "react";
import styles from "../FriendsPage.module.css";
import FriendsRequestsListItem from "../FriendsRequestsListItem/FriendsRequestsListItem";
import {selectFriends, useAppSelector} from "../../../app/hooks";

const FriendsRequestsList: React.FC = () => {
  const users = useAppSelector(selectFriends)

  console.log("Пользователей в селекторе", users.length)

  if (!users.length) {
    return <h3>У вас нет заявок в друзья</h3>
  }

  return (
    <div className={styles.friendsList}>
      {users.map((user) => {
        return (
          <FriendsRequestsListItem
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

export default FriendsRequestsList;
