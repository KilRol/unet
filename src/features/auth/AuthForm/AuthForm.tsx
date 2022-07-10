import React from "react";
import Button from "../../../components/Button/Button";
import styles from "./AuthForm.module.css";

type AuthFormType = {
  onChangeUsernameHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangePasswordHandler: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.MouseEventHandler<HTMLFormElement>;
};

const AuthForm: React.FC<AuthFormType> = ({
                                            onChangeUsernameHandler,
                                            onChangePasswordHandler,
                                            handleSubmit,
                                          }) => {
  return (
    <div className={styles.registerForm}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">
          E-mail:
          <input type="text" id="login" onChange={onChangeUsernameHandler} required/>
        </label>
        <label htmlFor="password">
          Пароль:
          <input
            type="password"
            id="password"
            onChange={onChangePasswordHandler}
            required
          />
        </label>
        <Button>Войти</Button>
      </form>
    </div>
  );
};

export default AuthForm;
