import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {FetchUserAction} from "../reducers/User/Actions/FetchUserAction";
import {SetLoadingFalseAction} from "../reducers/LoadingReducer/Actions/SetLoadingFalseAction";
import {SetLoadingTrueAction} from "../reducers/LoadingReducer/Actions/SetLoadingTrueAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getUser = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(SetLoadingTrueAction())
    const userRef = doc(db, "users", id);
    getDoc(userRef).then((user) => {
      dispatch(FetchUserAction({
        userId: user.get("userId"),
        email: user.get("email"),
        name: user.get("name"),
        image: user.get("image"),
        about: user.get("about"),
        id: user.id,
      }))
      dispatch(SetLoadingFalseAction())
    });
  }
}
