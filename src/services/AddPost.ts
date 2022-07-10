import {addDoc, collection, getFirestore, updateDoc,} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {AddPostAction} from "../reducers/Post/Actions/AddPostAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const AddPost = (post: string, userId: string) => {
  return (dispatch: Dispatch) => {
    const userRef = collection(db, "users", userId, "posts");
    const date = Date.now();
    addDoc(userRef, {author: userId, content: post, date: date}).then(
      (pointer) => {
        updateDoc(pointer, {id: pointer.id}).then(() => {
          dispatch(
            AddPostAction({
              author: userId,
              id: pointer.id,
              content: post,
              date: date,
              comments: [],
              likes: []
            })
          );
        });
      }
    );
  };
};
