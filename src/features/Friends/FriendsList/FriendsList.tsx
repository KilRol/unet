import React from "react";
import styles from "../FriendsPage.module.css";
import {selectFriends, useAppSelector} from "../../../app/hooks";
import FriendsListItem from "../FriendsListItem/FriendsListItem";

const FriendsList: React.FC = () => {
  const users = useAppSelector(selectFriends)

  console.log("Пользователей в селекторе", users.length)

  if (!users.length) {
    return (
      <h3>Очень жаль, но похоже у вас нет друзей 😞</h3>
    )
  }

  return (
    <div className={styles.friendsList}>
      {users.map((user) => {
        return (
          <FriendsListItem
            user={user}
            key={user.userId}
          />
        );
      })}
    </div>
  );
};

export default FriendsList;
