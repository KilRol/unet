import {addDoc, collection, deleteDoc, doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Dispatch} from "@reduxjs/toolkit";
import fetchUserByField from "./fetchField";
import {AddFriendAction} from "../reducers/Friends/Actions/AddFriendAction";
import {getUserInfoById} from "./getUserInfoById";
import {SubscribeUserAction} from "../reducers/Friends/Actions/SubscribeUserAction";
import User from "../types/User";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const AddFriend = (userId: string, id: string) => {
  const userSubscriptionsRef = collection(db, "users", userId, "subscriptions");
  const anotherUserRequestsRef = collection(db, "users", id, "requests");
  const userFriendsRef = collection(db, "users", userId, "friends");
  const anotherFriendsUserRef = collection(db, "users", id, "friends");
  return (dispatch: Dispatch) => {
    fetchUserByField("friends", userId, id).then((friendsWith) => {
      }, () => {
        fetchUserByField("subscriptions", userId, id).then((subscribeOn) => {
          }, () => {
            fetchUserByField("requests", userId, id).then((requestFrom) => {
                addDoc(userFriendsRef, {id: id}).then((userRef) => {
                  addDoc(anotherFriendsUserRef, {id: userId, dataId: userRef.id}).then((anotherUserRef) => {
                    updateDoc(userRef, {dataId: anotherUserRef.id}).then(() => {
                      const subs = collection(db, "users", id, "subscriptions")
                      const reqs = collection(db, "users", userId, "requests")
                      getDoc(doc(subs, requestFrom.dataId)).then((reqData) => {
                        deleteDoc(doc(reqs, reqData.get("dataId"))).then(() => {
                          deleteDoc(doc(subs, reqData.id)).then(() => {
                            getUserInfoById(id).then((user) => {
                              dispatch(AddFriendAction({
                                id: user.id,
                                userId: user.userId,
                                email: user.email,
                                image: user.image,
                                isSub: false,
                                isFriend: true
                              } as User))
                            })
                          })
                        })
                      })
                    })
                  })
                })
              }, () => {
                addDoc(userSubscriptionsRef, {id: id}).then((userSubscribeRef) => {
                  addDoc(anotherUserRequestsRef, {
                    id: userId,
                    dataId: userSubscribeRef.id
                  }).then((anotherUserRequestRef) => {
                    updateDoc(userSubscribeRef, {dataId: anotherUserRequestRef.id}).then(() =>
                      getUserInfoById(id).then((user) => {
                        dispatch(SubscribeUserAction({
                          id: user.id,
                          userId: user.userId,
                          email: user.email,
                          image: user.image,
                          isSub: true,
                          isFriend: false
                        } as User))
                      }))
                  })
                })
              }
            )
          }
        )
      }
    )
  }
}
