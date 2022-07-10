import React, {useEffect, useState} from "react";
import Post from "../../../types/Post";
import {selectUserId, useAppSelector} from "../../../app/hooks";
import {useDispatch} from "react-redux";
import DeletePostComment from "../../../services/DeletePostComment";
import {getUserInfoById} from "../../../services/getUserInfoById";
import User from "../../../types/User";
import styles from "./PostCommentsListItem.module.css"
import Button from "../../../components/Button/Button";
import {date} from "../../../utils/date";

type PostListItemProps = {
  id: string;
  postId: string;
  comment: Post;
};

const PostCommentsListItem: React.FC<PostListItemProps> = ({postId, id, comment}) => {
  const userId = useAppSelector(selectUserId);
  const dispatch = useDispatch();
  const [author, setAuthor] = useState<User>();
  const deletePostOnClick = () => {
    DeletePostComment(postId, comment.id, id)(dispatch);
  };

  useEffect(() => {
    getUserInfoById(comment.author).then(user => {
      setAuthor(user);
    })
  }, [comment.author])

  return (
    <div className={styles.comment}>
      <div className={styles.postHeader}>
        <div className={styles.commentInfo}>
          <h4>{author?.name}</h4>
          <div className={styles.postDate}>{date(comment.date)}</div>
        </div>
        {comment.author === userId ? (
          <Button style={styles.commentDeleteButton} onClick={deletePostOnClick}>&times;</Button>) : ("")}
      </div>
      <div className={styles.commentContent}>{comment.content}</div>

    </div>
  );
};

export default PostCommentsListItem;
