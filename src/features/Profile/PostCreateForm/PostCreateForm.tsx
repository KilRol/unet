import React, {useState} from "react";
import Button from "../../../components/Button/Button";
import {selectUserId, useAppDispatch, useAppSelector} from "../../../app/hooks";
import {AddPost} from "../../../services/AddPost";
import styles from "./PostCreateForm.module.css"

const PostCreateForm: React.FC = () => {
  const [post, setPost] = useState<string>("");
  const userId = useAppSelector(selectUserId);
  const dispatcher = useAppDispatch();

  const onChangeEventTextAreaHandler = (event: any) => {
    setPost(event.currentTarget.value);
  };
  const addPostOnClick = () => {
    if (post !== "") {
      AddPost(post, userId)(dispatcher)
      setPost("")
    }
  };

  return (
    <div className={styles.postCreateForm}>
      <label className={styles.makePost} htmlFor="postCreateField">
        <textarea
          className={styles.textarea}
          onChange={onChangeEventTextAreaHandler}
          name="postCreateField"
          id="postCreateField"
          value={post}
        />
      </label>
      <Button onClick={addPostOnClick} style={styles.makePostButton}>Создать запись</Button>
    </div>
  );
};

export default PostCreateForm;
