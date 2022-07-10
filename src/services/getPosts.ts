import {Dispatch} from "@reduxjs/toolkit";
import {FetchPostsAction} from "../reducers/Post/Actions/FetchPostsAction";
import Post from "../types/Post";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getPosts = (id: string) => {
  return async (dispatch: Dispatch) => {
    const userRef = collection(db, "users", id, "posts");
    const list: Post[] = [];
    const posts = await getDocs(userRef);

    for (const e of posts.docs) {
      const commentsRef = collection(db, "users", id, "posts", e.id, "comments");
      const comments = await getDocs(commentsRef)
      const likesRef = collection(db, "users", id, "posts", e.id, "likes");
      const likes = await getDocs(likesRef)
      list.push({
        author: e.get("author"),
        id: e.get("id"),
        content: e.get("content"),
        date: e.get("date"),
        comments: comments.docs.map(e => e.data() as Post) as Post[],
        likes: likes.docs.map(e => e.get("id") as string)
      })
    }
    dispatch(FetchPostsAction(list));
  };
};
