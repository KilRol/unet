import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {collection, deleteDoc, doc, getFirestore} from "firebase/firestore";
import {Dispatch} from "@reduxjs/toolkit";
import {DeletePostAction} from "../reducers/Post/Actions/DeletePostAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DeletePost = (postId: string, userId: string) => {
  return (dispatch: Dispatch) => {
    const userRef = collection(db, "users", userId, "posts");
    deleteDoc(doc(userRef, postId)).then(() => {
      dispatch(DeletePostAction(postId));
    });
  };
};

export default DeletePost;
