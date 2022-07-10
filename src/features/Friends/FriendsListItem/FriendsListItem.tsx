import React, {useState} from "react";
import styles from "../FriendsPage.module.css";
import Button from "../../../components/Button/Button";
import {selectUserId, useAppDispatch, useAppSelector} from "../../../app/hooks";
import User from "../../../types/User";
import {Link} from "react-router-dom";
import RemoveFriend from "../../../services/RemoveFriend";
import {AddFriend} from "../../../services/AddFriend";
import {defAvatar} from "../../Profile/ProfileInfo/ProfileInfo";

type FriendsListItemProps = {
  user: User;
}

const FriendsListItem: React.FC<FriendsListItemProps> = ({user}) => {
  const userIdOrig = useAppSelector(selectUserId);
  const dispatch = useAppDispatch()
  const [clicked, setClicked] = useState<boolean>(false);
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
          (<Button style={styles.button} onClick={removeFriendOnClick}>Удалить из друзей</Button>)
        }
      </div>
    </div>
  );
};

export default FriendsListItem;
