import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {collection, deleteDoc, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import {Dispatch} from "@reduxjs/toolkit";
import {DeleteCommentAction} from "../reducers/Post/Actions/DeleteCommentAction";
import Post from "../types/Post";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DeletePostComment = (postId: string, commentId: string, id: string) => {
  return (dispatch: Dispatch) => {
    const commentsRef = collection(db, "users", id, "posts", postId, "comments");
    const likesRef = collection(db, "users", id, "posts", postId, "likes");

    deleteDoc(doc(commentsRef, commentId)).then(async () => {
      const userRef = collection(db, "users", id, "posts")
      const e = await getDoc(doc(userRef, postId));
      const comments = await getDocs(commentsRef)
      const likes = await getDocs(likesRef)
      dispatch(DeleteCommentAction({
        author: e.get("author"),
        id: e.get("id"),
        content: e.get("content"),
        date: e.get("date"),
        comments: comments.docs.map(e => e.data() as Post) as Post[],
        likes: likes.docs.map(e => e.get("id") as string)
      }, postId))
    });
  };
};

export default DeletePostComment;
