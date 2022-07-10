import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {addDoc, collection, deleteDoc, doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";
import {Dispatch} from "@reduxjs/toolkit";
import fetchUserByField from "./fetchField";
import {getUserInfoById} from "./getUserInfoById";
import User from "../types/User";
import {RemoveFriendAction} from "../reducers/Friends/Actions/RemoveFriendAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const RemoveFriend = (userId: string, id: string) => {
  const userRequestsRef = collection(db, "users", userId, "requests");
  const anotherUserSubscriptionsRef = collection(db, "users", id, "subscriptions");
  const userFriendsRef = collection(db, "users", userId, "friends");
  const anotherFriendsUserRef = collection(db, "users", id, "friends");

  return (dispatch: Dispatch) => {
    fetchUserByField("subscriptions", userId, id).then((a) => {
      console.log('trying', a)
      getDoc(doc(collection(db, "users", id, "requests"), a.dataId)).then((subOn) => {
        deleteDoc(doc(collection(db, "users", userId, "subscriptions"), subOn.get("dataId")))
          .then(() => {
              deleteDoc(doc(collection(db, "users", id, "requests"), a.dataId)).then(() => {
                getUserInfoById(id).then((user) => {
                  const r = {
                    id: user.id,
                    userId: user.userId,
                    email: user.email,
                    image: user.image,
                    isSub: false,
                    isFriend: false
                  } as User;
                  dispatch(RemoveFriendAction(r))
                })
              })
            }
          )
      })
    }, () => {
      addDoc(userRequestsRef, {id: id}).then((userRequestRef) => {
        addDoc(anotherUserSubscriptionsRef, {id: userId, dataId: userRequestRef.id})
          .then((anotherUserSubscriptionRef) => {
            updateDoc(userRequestRef, {dataId: anotherUserSubscriptionRef.id}).then(() =>
              fetchUserByField("friends", userId, id).then((friendsWith) => {
                const anotherUserRecord = doc(anotherFriendsUserRef, friendsWith.dataId)
                getDoc(anotherUserRecord).then((anotherUserData) => {
                  deleteDoc(doc(userFriendsRef, anotherUserData.get("dataId"))).then(() => {
                    deleteDoc(anotherUserRecord).then(() => {
                      getUserInfoById(id).then((user) => {
                        const r = {
                          id: user.id,
                          userId: user.userId,
                          email: user.email,
                          image: user.image,
                          isSub: false,
                          isFriend: false
                        } as User;
                        dispatch(RemoveFriendAction(r))
                      })
                    })
                  });
                })
              })
            )
          })
      })
    })
  };
};

export default RemoveFriend;
