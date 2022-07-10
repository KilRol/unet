import React from "react";
import styles from "./PostListItem.module.css";
import Post from "../../../types/Post";
import DeletePost from "../../../services/DeletePost";
import {selectUserId, useAppDispatch, useAppSelector} from "../../../app/hooks";
import PostCommentsList from "../PostCommentsList/PostCommentsList";
import {SetLike} from "../../../services/SetLike";
import Button from "../../../components/Button/Button";
import {date} from "../../../utils/date";
import classNames from "classnames";

type PostListItemProps = {
  post: Post;
};

const PostListItem: React.FC<PostListItemProps> = ({post}) => {
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const deletePostOnClick = () => {
    DeletePost(post.id, userId)(dispatch);
  };

  const setLikeOnClick = () => {
    SetLike(userId, post.author, post.id)(dispatch)
  }

  return (
    <div className={classNames(styles.post, styles.postPadding)}>
      <div className={styles.postHeader}>
        <div className={styles.postDate}>{date(post.date)}</div>
        {post.author === userId ? (
          <Button style={styles.postDeleteButton} onClick={deletePostOnClick}>&times;</Button>) : ("")}
      </div>
      <div className={styles.postContent}>{post.content}</div>
      <div className={styles.postLikeBlock}>
        <Button style={styles.likeButton} onClick={setLikeOnClick}>👍</Button><span>{post.likes.length}</span>
      </div>
      <PostCommentsList postId={post.id} author={post.author} comments={post.comments}/>
    </div>
  );
};

export default PostListItem;
