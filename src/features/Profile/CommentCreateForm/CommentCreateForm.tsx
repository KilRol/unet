import React, {useState} from "react";
import Button from "../../../components/Button/Button";
import {selectUserId, useAppSelector} from "../../../app/hooks";
import {useDispatch} from "react-redux";
import {AddPostComment} from "../../../services/AddPostComment";
import styles from "./CommentCreateForm.module.css"

type CommentCreateFormType = {
  postId: string
  id: string
}

const CommentCreateForm: React.FC<CommentCreateFormType> = ({postId, id}) => {
  const [comment, setComment] = useState<string>("");
  const userId = useAppSelector(selectUserId);
  const dispatcher = useDispatch();

  const onChangeEventTextAreaHandler = (event: any) => {
    setComment(event.currentTarget.value);
  };

  const addCommentOnClick = () => {
    if (comment !== "") {
      AddPostComment(comment, userId, id, postId)(dispatcher);
      setComment("")
    }
  };

  return (
    <div className={styles.CommentForm}>
      <label htmlFor="postCreateField">
        <textarea
          className={styles.textarea}
          onChange={onChangeEventTextAreaHandler}
          name="postCreateField"
          id="postCreateField"
          value={comment}
        />
      </label>
      <Button style={styles.commentButton} onClick={addCommentOnClick}>Оставить комментарий</Button>
    </div>
  );
};

export default CommentCreateForm;
