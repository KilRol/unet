import React, {useEffect, useState} from "react";
import AuthForm from "../../features/auth/AuthForm/AuthForm";
import {initializeApp} from "firebase/app";
import {Auth, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {firebaseConfig} from "../../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {LoginAction} from "../../reducers/Auth/Actions/LoginAction";
import {Link, useNavigate} from "react-router-dom";
import {collection, getDocs, getFirestore, query, where,} from "firebase/firestore";
import {LoginDBAction} from "../../reducers/AuthDB/actions/LoginDBAction";
import {selectAuthError, selectAuthStatus, selectUserId, useAppDispatch, useAppSelector} from "../../app/hooks";
import {AuthSuccessAction} from "../../reducers/Auth/Actions/AuthSuccessAction";
import {AuthErrorAction} from "../../reducers/Auth/Actions/AuthErrorAction";
import {AuthStatusInitAction} from "../../reducers/Auth/Actions/AuthStatusInitAction";
import styles from "../RegisterPage/RegisterPage.module.css";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = (
  auth: Auth,
  username: string | undefined,
  password: string | undefined
) => {
  return (dispatch: Dispatch) => {
    if (typeof username === "string" && typeof password === "string") {
      signInWithEmailAndPassword(auth, username, password).then(() => {
        const q = query(
          collection(db, "users"),
          where("userId", "==", auth.currentUser?.uid)
        );
        getDocs(q).then((qS) => {
          dispatch(LoginAction(auth.currentUser?.toJSON()));
          dispatch(LoginDBAction(qS.docs[0].id));
          dispatch(AuthSuccessAction())
        })
      }, (error) => {
        dispatch(AuthErrorAction(error.code))
      })
    }
  };
};

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const authStatus = useAppSelector(selectAuthStatus)
  const authError = useAppSelector(selectAuthError)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const uid = useAppSelector(selectUserId);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    login(auth, username, password)(dispatch)
  };

  const onChangePasswordHandler = (event: any) => {
    setPassword(event.currentTarget.value);
  };
  const onChangeUsernameHandler = (event: any) => {
    setUsername(event.currentTarget.value);
  };

  useEffect(() => {
    if (authError) {
      switch (authError) {
        case "auth/user-not-found": {
          setErrorMessage("Пользователь не найден")
          break
        }
        case "auth/wrong-password": {
          setErrorMessage("Неверный пароль")
          break
        }
        case "auth/invalid-email": {
          setErrorMessage("Некорректный e-mail")
          break
        }
        default: {
          setErrorMessage(authError)
          break
        }
      }
      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
    }
    if (authStatus && uid) {
      navigate("/profile")
    }
    dispatch(AuthStatusInitAction())
  }, [dispatch, navigate, authStatus, authError, uid])

  return (
    <>
      <AuthForm
        handleSubmit={handleSubmit}
        onChangeUsernameHandler={onChangeUsernameHandler}
        onChangePasswordHandler={onChangePasswordHandler}
      />
      {errorMessage ? (<p className={styles.error}>{errorMessage}</p>) : ""}
      <Link to="/register">Зарегистрироваться</Link>
    </>
  );
};

export default AuthPage;
