import {addDoc, collection, doc, getDoc, getDocs, getFirestore, updateDoc,} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {AddCommentAction} from "../reducers/Post/Actions/AddCommentAction";
import Post from "../types/Post";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const AddPostComment = (comment: string, userId: string, id: string, postId: string) => {
  return async (dispatch: Dispatch) => {
    const commentsRef = collection(db, "users", id, "posts", postId, "comments");
    const likesRef = collection(db, "users", id, "posts", postId, "likes");
    const date = Date.now();
    addDoc(commentsRef, {author: userId, content: comment, date: date}).then(
      (pointer) => {
        updateDoc(pointer, {id: pointer.id}).then(async () => {
          const userRef = collection(db, "users", id, "posts")
          const e = await getDoc(doc(userRef, postId));
          const comments = await getDocs(commentsRef)
          const likes = await getDocs(likesRef)
          dispatch(AddCommentAction({
              author: e.get("author"),
              id: e.get("id"),
              content: e.get("content"),
              date: e.get("date"),
              comments: comments.docs.map(e => e.data() as Post) as Post[],
              likes: likes.docs.map(e => e.get("id") as string)
            }, postId)
          );
        });
      }
    );
  };
};
