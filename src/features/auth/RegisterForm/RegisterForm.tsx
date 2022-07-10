import React from "react";
import Button from "../../../components/Button/Button";
import styles from "./RegisterForm.module.css";

type RegisterFormType = {
  onChangeUsernameHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangePasswordHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangeDisplayNameHandle: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhotoUrlHandler: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.MouseEventHandler<HTMLFormElement>;
};

const RegisterForm: React.FC<RegisterFormType> = ({
                                                    onChangeUsernameHandler,
                                                    onChangePasswordHandler,
                                                    onChangeDisplayNameHandle,
                                                    onChangePhotoUrlHandler,
                                                    handleSubmit,
                                                  }) => {
  return (
    <div className={styles.registerForm}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">
          Имя:
          <input
            required
            type="text"
            id="displayName"
            placeholder="Олег"
            onChange={onChangeDisplayNameHandle}
          />
        </label>
        <label htmlFor="photoUrl">
          photoUrl:
          <input
            type="text"
            id="photoUrl"
            placeholder="URL изображения"
            onChange={onChangePhotoUrlHandler}
          />
        </label>
        <label htmlFor="login">
          Email:
          <input
            required
            type="text"
            id="login"
            placeholder="Email"
            onChange={onChangeUsernameHandler}
          />
        </label>
        <label htmlFor="password">
          Пароль:
          <input
            required
            type="password"
            id="password"
            placeholder="абвгдеёж"
            onChange={onChangePasswordHandler}
          />
        </label>
        <Button>Зарегистрироваться</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
