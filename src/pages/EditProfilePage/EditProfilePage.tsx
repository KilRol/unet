import React, {useState} from "react";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import {getAuth, updateEmail, updatePassword, updateProfile,} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {LoginAction} from "../../reducers/Auth/Actions/LoginAction";
import {useDispatch} from "react-redux";
import {doc, getFirestore, updateDoc} from "firebase/firestore";
import {selectUserId, useAppSelector} from "../../app/hooks";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const editProfile = (
  userId: string,
  email: string,
  password: string,
  displayName: string,
  photoURL: string,
  about: string
) => {
  return async (dispatch: Dispatch) => {
    if (auth.currentUser) {
      if (displayName !== "") {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        }).catch((err) => {
          throw new Error(err);
        });
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, {name: displayName}).catch((err) => {
          throw new Error(err);
        });
      }
      if (photoURL !== "") {
        await updateProfile(auth.currentUser, {
          photoURL: photoURL,
        }).catch((err) => {
          throw new Error(err);
        });
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, {image: photoURL}).catch((err) => {
          throw new Error(err);
        });
      }
      if (email !== "") {
        await updateEmail(auth.currentUser, email).catch((err) => {
          throw new Error(err);
        });
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, {email: email}).catch((err) => {
          throw new Error(err);
        });
      }
      if (password !== "") {
        await updatePassword(auth.currentUser, password).catch((err) => {
          throw new Error(err);
        });
      }
      if (about !== "") {
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, {about: about}).catch((err) => {
          throw new Error(err);
        });
      }
      dispatch(LoginAction(auth.currentUser?.toJSON()));
    }
  };
};

const EditProfilePage: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();
  const [photoURL, setPhotoURL] = useState<string>();
  const [about, setAbout] = useState<string>();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const userId = useAppSelector(selectUserId);
  const handleUpdate = async (event: any) => {
    event.preventDefault();
    await editProfile(
      userId ?? "",
      email ?? "",
      password ?? "",
      displayName ?? "",
      photoURL ?? "",
      about ?? ""
    )(dispatcher)
      .then(() => navigate("/profile"))
      .catch((err) => {
        alert(err);
      });
  };

  const onChangeDisplayNameHandler = (event: any) => {
    setDisplayName(event.currentTarget.value);
  };
  const onChangePhotoUrlHandler = (event: any) => {
    setPhotoURL(event.currentTarget.value);
  };
  const onChangeEmailHandler = (event: any) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePasswordHandler = (event: any) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeAboutHandler = (event: any) => {
    setAbout(event.currentTarget.value);
  };

  return (
    <EditProfileForm
      onChangeDisplayNameHandle={onChangeDisplayNameHandler}
      onChangePhotoUrlHandler={onChangePhotoUrlHandler}
      onChangeUsernameHandler={onChangeEmailHandler}
      onChangePasswordHandler={onChangePasswordHandler}
      onChangeAboutHandler={onChangeAboutHandler}
      handleSubmit={handleUpdate}
    />
  );
};
export default EditProfilePage;
