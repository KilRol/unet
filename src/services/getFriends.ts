import {Dispatch} from "@reduxjs/toolkit";
import {collection, doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {SetLoadingTrueAction} from "../reducers/LoadingReducer/Actions/SetLoadingTrueAction";

import User from "../types/User";
import fetchUserCollection from "./fetchUserCollection";
import {SetLoadingFalseAction} from "../reducers/LoadingReducer/Actions/SetLoadingFalseAction";
import {FetchFriendsAction} from "../reducers/Friends/Actions/FetchFriendsAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getFriends = (field: string, id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(SetLoadingTrueAction())
    fetchUserCollection(field, id).then(async (fieldCollection) => {
      const list: User[] = [];
      const usersRef = collection(db, "users");
      for (const e of fieldCollection) {
        const user = await getDoc(doc(usersRef, e.id));
        list.push(user.data() as User);
      }
      dispatch(FetchFriendsAction(list));
      dispatch(SetLoadingFalseAction());
    });
  }
}
