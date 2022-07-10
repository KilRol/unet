import React, {useState} from "react";
import styles from "../FriendsPage.module.css";
import User from "../../../types/User";
import {selectUserId, useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Link} from "react-router-dom";
import Button from "../../../components/Button/Button";
import RemoveFriend from "../../../services/RemoveFriend";
import {AddFriend} from "../../../services/AddFriend";
import {defAvatar} from "../../Profile/ProfileInfo/ProfileInfo";

const SubscriptionsListItem: React.FC<User> = (user) => {
  const userIdOrig = useAppSelector(selectUserId);
  const [clicked, setClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const removeFriendOnClick = () => {
    RemoveFriend(userIdOrig, user.id)(dispatch);
    setClicked(true);
  }
  const addFriendOnClick = () => {
    AddFriend(userIdOrig, user.id)(dispatch);
    setClicked(false);
  }
  return (
    <div key={user.userId} className={styles.card}>
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
        {clicked ?
          (<Button style={styles.button} onClick={addFriendOnClick}>Добавить в друзья</Button>) :
          (<Button style={styles.button} onClick={removeFriendOnClick}>Отменить запрос</Button>)}
      </div>
    </div>
  );
};

export default SubscriptionsListItem;
