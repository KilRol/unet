import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where,} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {SetLikeAction} from "../reducers/Post/Actions/SetLikeAction";
import {UnsetLikeAction} from "../reducers/Post/Actions/UnsetLikeAction";
import Post from "../types/Post";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const SetLike = (userId: string, id: string, postId: string) => {
  return async (dispatch: Dispatch) => {
    const commentsRef = collection(db, "users", id, "posts", postId, "comments");
    const postsRef = collection(db, "users", id, "posts")
    const likesRef = collection(db, "users", id, "posts", postId, "likes");
    const q = query(
      likesRef,
      where("id", "==", userId)
    )
    getDocs(q).then(e => {
      if (e.empty) {
        addDoc(likesRef, {id: userId}).then(async () => {
            const d = await getDoc(doc(postsRef, postId));
            const comments = await getDocs(commentsRef)
            const likes = await getDocs(likesRef)
            dispatch(SetLikeAction({
              author: d.get("author"),
              id: d.get("id"),
              content: d.get("content"),
              date: d.get("date"),
              comments: comments.docs.map(e => e.data() as Post) as Post[],
              likes: likes.docs.map(e => e.get("id") as string)
            }, postId))
          }
        );
      } else {
        deleteDoc(e.docs[0].ref).then(async () => {
          const d = await getDoc(doc(postsRef, postId));
          const comments = await getDocs(commentsRef)
          const likes = await getDocs(likesRef)
          dispatch(UnsetLikeAction({
            author: d.get("author"),
            id: d.get("id"),
            content: d.get("content"),
            date: d.get("date"),
            comments: comments.docs.map(e => e.data() as Post) as Post[],
            likes: likes.docs.map(e => e.get("id") as string)
          }, postId))
        })
      }
    })
  };
};
