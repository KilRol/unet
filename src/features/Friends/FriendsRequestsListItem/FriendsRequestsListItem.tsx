import React from "react";
import styles from "../FriendsPage.module.css";
import Button from "../../../components/Button/Button";
import {selectUserId, useAppDispatch, useAppSelector} from "../../../app/hooks";
import User from "../../../types/User";
import {Link} from "react-router-dom";
import {AddFriend} from "../../../services/AddFriend";
import {defAvatar} from "../../Profile/ProfileInfo/ProfileInfo";

const FriendsRequestsListItem: React.FC<User> = (user) => {
  const userIdOrig = useAppSelector(selectUserId);
  const dispatch = useAppDispatch()
  const addFriendOnClick = () => {
    AddFriend(userIdOrig, user.id)(dispatch)
  }
  return (
    <div className={styles.card}>
      <div className={styles.cardUser}>
        <div className={styles.card_imageBox}>
          <img src={user.image ? user.image : defAvatar} alt="avatar"/>
        </div>
        <div className={styles.userInfo}>
          <Link to={"/" + user.id}>
            <h3>{user.name}</h3>
          </Link>
        </div>
      </div>
      <div className={styles.buttonArea}>
        {userIdOrig !== user.id ? (
          <Button
            style={styles.button}
            onClick={addFriendOnClick}
          >
            Добавить в друзья
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FriendsRequestsListItem;
