import React, {useEffect} from "react";

import PostListItem from "../PostListItem/PostListItem";
import {useDispatch} from "react-redux";
import {getPosts} from "../../../services/getPosts";
import {selectPosts, useAppSelector} from "../../../app/hooks";
import Post from "../../../types/Post";
import styles from "./PostList.module.css"

type PostListType = {
  id: string;
};

const PostList: React.FC<PostListType> = ({id}) => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts(id)(dispatch);
  }, [dispatch, id]);
  return (
    <div className={styles.postList}>
      {posts.sort((a, b) => b.date - a.date).map((e: Post, index: number) => {
        return <PostListItem key={index} post={e}/>;
      })}
    </div>
  );
};

export default PostList;
