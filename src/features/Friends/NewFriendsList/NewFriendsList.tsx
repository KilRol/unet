import React from "react";
import styles from "../FriendsPage.module.css";
import NewFriendsListItem from "../NewFriendsListItem/NewFriendsListItem";
import {selectUserList, useAppSelector} from "../../../app/hooks";

const NewFriendsList: React.FC = () => {
  const users = useAppSelector(selectUserList)

  console.log("Пользователей в селекторе", users.length)

  if (!users.length) {
    return <h3>На платформе нет пользователей?<br/>Странно🤔 Вы же существуете</h3>
  }

  return (
    <div className={styles.friendsList}>
      {users.map((user) =>
        <NewFriendsListItem
          key={user.userId}
          user={user}
        />
      )}
    </div>
  );
};

export default NewFriendsList;
