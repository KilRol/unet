import React from "react";
import {selectUserProfile, useAppSelector} from "../../../app/hooks";
import styles from "./ProfileInfo.module.css"
import classNames from "classnames";

export const defAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

const ProfileInfo: React.FC = () => {
  const user = useAppSelector(selectUserProfile)
  return (
    <div className={styles.profileData}>
      <div className={styles.imageBox}>
        <img src={user.image ? user.image : defAvatar} alt="avatar"/>
      </div>
      <div className={classNames(styles.profileInfo, styles.profileInfoPadding)}>
        <h3>{user.name}</h3>
        {user.about !== undefined ? (<div>{user.about}</div>) : ""}
        <div><b>E-mail:</b> {user.email}</div>
      </div>
    </div>
  )
}
export default ProfileInfo
