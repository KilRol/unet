import {arrayRemove, arrayUnion, doc, getFirestore, updateDoc,} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const removeFriend = async (userId: string, id: string) => {
  const userDoc = doc(db, "users", userId);
  const anotherUserDoc = doc(db, "users", id);
  updateDoc(userDoc, {friends: arrayRemove(id)});
  updateDoc(userDoc, {requests: arrayUnion(id)});
  updateDoc(anotherUserDoc, {friends: arrayRemove(userId)});
  updateDoc(anotherUserDoc, {subscriptions: arrayUnion(userId)});
};

export const acceptFriendRequest = async (userId: string, id: string) => {
  const userDoc = doc(db, "users", userId);
  const anotherUserDoc = doc(db, "users", id);
  updateDoc(userDoc, {friends: arrayUnion(id)});
  updateDoc(userDoc, {requests: arrayRemove(id)});
  updateDoc(anotherUserDoc, {friends: arrayUnion(userId)});
  updateDoc(anotherUserDoc, {subscriptions: arrayRemove(userId)});
};

export const sendFriendRequest = async (userId: string, id: string) => {
  const userDoc = doc(db, "users", userId);
  const anotherUserDoc = doc(db, "users", id);
  updateDoc(userDoc, {subscriptions: arrayUnion(id)});
  updateDoc(anotherUserDoc, {requests: arrayUnion(userId)});
};

export const revokeFriendRequest = async (userId: string, id: string) => {
  const userDoc = doc(db, "users", userId);
  const anotherUserDoc = doc(db, "users", id);
  updateDoc(userDoc, {subscriptions: arrayRemove(id)});
  updateDoc(anotherUserDoc, {requests: arrayRemove(userId)});
};
