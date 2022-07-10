import {collection, getDocs, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import {FetchUserListAction} from "../reducers/UserList/Actions/FetchUserListAction";
import {SetLoadingTrueAction} from "../reducers/LoadingReducer/Actions/SetLoadingTrueAction";
import {SetLoadingFalseAction} from "../reducers/LoadingReducer/Actions/SetLoadingFalseAction";
import fetchUserCollection from "./fetchUserCollection";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getAllUsers = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(SetLoadingTrueAction())
    const userCollectionRef = collection(db, "users");
    const friendsList = await fetchUserCollection("friends", userId);
    const subscriptionsList = await fetchUserCollection("subscriptions", userId);
    const friendsId = friendsList.map(e => e.id);
    const subscriptionsId = subscriptionsList.map(e => e.id);
    getDocs(userCollectionRef).then((users) => {
      dispatch(FetchUserListAction(users.docs.map((user) => ({
        userId: user.data().userId,
        email: user.data().email,
        name: user.data().name,
        image: user.data().image,
        id: user.id,
        isFriend: friendsId.includes(user.id),
        isSub: subscriptionsId.includes(user.id)
      }))))
      dispatch(SetLoadingFalseAction())
    })
  }
};

export default getAllUsers;
