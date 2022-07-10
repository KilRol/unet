import React, {useState} from "react";
import styles from "../FriendsPage.module.css";
import Button from "../../../components/Button/Button";
import {selectUserId, useAppDispatch, useAppSelector} from "../../../app/hooks";
import User from "../../../types/User";
import {Link} from "react-router-dom";
import {AddFriend} from "../../../services/AddFriend";
import RemoveFriend from "../../../services/RemoveFriend";
import {defAvatar} from "../../Profile/ProfileInfo/ProfileInfo";

type NewFriendsListItemType = {
  user: User;
}

const NewFriendsListItem: React.FC<NewFriendsListItemType> = ({user}) => {
    const userIdOrig = useAppSelector(selectUserId);
    const dispatch = useAppDispatch()
    const [clicked, setClicked] = useState<boolean>(false);
    const addFriendOnClick = () => {
      setClicked(true);
      AddFriend(userIdOrig, user.id)(dispatch)
    }
    const removeFriendOnClick = () => {
      setClicked(false);
      RemoveFriend(userIdOrig, user.id)(dispatch)
    }
    const isFriend = () => {
      if (userIdOrig === user.id) {
        return ("")
      }
      if (user.isFriend) {
        return ("")
      }
      if (user.isSub) {
        return ("")
      }
      if (clicked) {
        return (<Button style={styles.button} onClick={removeFriendOnClick}>Отменить запрос</Button>)
      } else {
        return (<Button style={styles.button} onClick={addFriendOnClick}>Добавить в друзья</Button>)
      }
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
          {isFriend()}
        </div>
      </div>
    );
  }
;

export default NewFriendsListItem;
