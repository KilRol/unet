import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import User from "../types/User";
import {Dispatch} from "@reduxjs/toolkit";
import {FetchUserListAction} from "../reducers/UserList/Actions/FetchUserListAction";
import {SetLoadingTrueAction} from "../reducers/LoadingReducer/Actions/SetLoadingTrueAction";
import {SetLoadingFalseAction} from "../reducers/LoadingReducer/Actions/SetLoadingFalseAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getUsers = (field: string, userId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(SetLoadingTrueAction())
    const list: User[] = [];
    const dataRef = doc(db, "users", userId);
    getDoc(dataRef).then((user) => {
      const users = user.get(field);
      if (!users.length) {
        dispatch(FetchUserListAction([]))
        dispatch(SetLoadingFalseAction())
      }
      users.forEach((e: any) => {
        getDoc(doc(db, "users", e)).then((r) => {
            list.push({
              userId: r.get("userId"),
              email: r.get("email"),
              name: r.get("name"),
              image: r.get("image"),
              id: r.id,
            })
            dispatch(FetchUserListAction(list))
            dispatch(SetLoadingFalseAction())
          }
        )
      })
    })
  }
};

export default getUsers;
