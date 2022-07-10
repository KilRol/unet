import React from "react";
import Post from "../../../types/Post";
import PostCommentsListItem from "../PostCommentsListItem/PostCommentsListItem";
import CommentCreateForm from "../CommentCreateForm/CommentCreateForm";

type PostCommentsListType = {
  postId: string;
  author: string;
  comments: Post[];
};

const PostCommentsList: React.FC<PostCommentsListType> = ({comments, postId, author}) => {
  return (
    <>
      <h3>Комментарии</h3>
      <CommentCreateForm postId={postId} id={author}/>
      {comments.sort((a, b) => b.date - a.date).map((e: Post, index: number) => {
        return <PostCommentsListItem key={index} id={author} postId={postId} comment={e}/>;
      })}
    </>
  );
};

export default PostCommentsList;
