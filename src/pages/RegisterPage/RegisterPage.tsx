import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth,} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebaseConfig";
import RegisterForm from "../../features/auth/RegisterForm/RegisterForm";
import {selectRegisterError, selectRegisterStatus, useAppDispatch, useAppSelector} from "../../app/hooks";
import RegisterUser from "../../services/RegisterUser";
import {UserRegisterInitAction} from "../../reducers/RegisterReducer/Actions/SetUserRegisterInitAction";
import styles from "./RegisterPage.module.css"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [photoURL, setPhotoURL] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      RegisterUser(auth, username, password, photoURL, displayName)(dispatch)
    };
    const registerStatus = useAppSelector(selectRegisterStatus)
    const registerError = useAppSelector(selectRegisterError)

    useEffect(() => {
        if (registerError) {
          switch (registerError) {
            case "auth/email-already-in-use": {
              setErrorMessage("Пользователь с этим e-mail уже существует")
              break
            }
            case "auth/weak-password": {
              setErrorMessage("Слишком слабый пароль")
              break
            }
            case "auth/invalid-email": {
              setErrorMessage("Некорректный e-mail")
              break
            }
            default: {
              setErrorMessage(registerError)
              break
            }
          }
          setTimeout(() => {
            setErrorMessage("")
          }, 3000)
        }
        if (registerStatus) {
          navigate("/auth")
        }
        dispatch(UserRegisterInitAction())
      }, [dispatch, navigate, registerStatus, registerError]
    )

    const onChangePasswordHandler = (event: any) => {
      setPassword(event.currentTarget.value);
    };
    const onChangeUsernameHandler = (event: any) => {
      setUsername(event.currentTarget.value);
    };
    const onChangeDisplayNameHandler = (event: any) => {
      setDisplayName(event.currentTarget.value);
    };
    const onChangePhotoUrlHandler = (event: any) => {
      setPhotoURL(event.currentTarget.value);
    };

    return (
      <>
        <RegisterForm
          onChangeUsernameHandler={onChangeUsernameHandler}
          onChangePasswordHandler={onChangePasswordHandler}
          onChangeDisplayNameHandle={onChangeDisplayNameHandler}
          onChangePhotoUrlHandler={onChangePhotoUrlHandler}
          handleSubmit={handleSubmit}
        />
        {errorMessage !== "" ? (<p className={styles.error}>{errorMessage}</p>) : ""}
        <Link to="/auth">Уже зарегистрирован</Link>
      </>
    );
  }
;

export default RegisterPage;
