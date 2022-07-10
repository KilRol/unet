import React from "react";
import styles from "../../features/auth/RegisterForm/RegisterForm.module.css";
import Button from "../Button/Button";

type EditProfileFormType = {
  onChangeUsernameHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangeDisplayNameHandle: React.ChangeEventHandler<HTMLInputElement>;
  onChangePasswordHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhotoUrlHandler: React.ChangeEventHandler<HTMLInputElement>;
  onChangeAboutHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleSubmit: React.MouseEventHandler<HTMLFormElement>;
};

const EditProfileForm: React.FC<EditProfileFormType> = ({
                                                          onChangeUsernameHandler,
                                                          onChangePasswordHandler,
                                                          onChangeDisplayNameHandle,
                                                          onChangePhotoUrlHandler,
                                                          onChangeAboutHandler,
                                                          handleSubmit,
                                                        }) => {
  return (
    <div className={styles.registerForm}>
      <h2>Редактирование профиля</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">
          Имя:
          <input
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
          Почта:
          <input
            type="text"
            id="login"
            placeholder="Email"
            onChange={onChangeUsernameHandler}
          />
        </label>
        <label htmlFor="password">
          Пароль:
          <input
            type="password"
            id="password"
            placeholder="абвгдеёж"
            onChange={onChangePasswordHandler}
          />
        </label>
        <label htmlFor="about">
          О себе:
          <textarea
            className={styles.about}
            name="about"
            id="about"
            placeholder="Немного о себе"
            onChange={onChangeAboutHandler}
          />
        </label>
        <Button>Сохранить</Button>
      </form>
    </div>
  );
};

export default EditProfileForm;
