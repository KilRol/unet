import {addDoc, collection, getFirestore, updateDoc} from "firebase/firestore";
import {Dispatch} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {Auth, createUserWithEmailAndPassword} from "firebase/auth";
import {UserRegisterSuccessAction} from "../reducers/RegisterReducer/Actions/UserRegisterSuccessAction";
import {UserRegisterFailedAction} from "../reducers/RegisterReducer/Actions/UserRegisterFailedAction";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollectionRef = collection(db, "users");

const RegisterUser = (auth: Auth, email: string, password: string, photoURL: string, displayName: string) => {
  return (dispatch: Dispatch) => {
    createUserWithEmailAndPassword(auth, email, password).then((newUser) => {
      addDoc(userCollectionRef, {
        userId: newUser.user.uid,
        name: displayName,
        email: email,
        image: photoURL,
      }).then(e => {
        updateDoc(e, {id: e.id}).then(() =>
          dispatch(UserRegisterSuccessAction())
        )
      })
    }, (error) => {
      dispatch(UserRegisterFailedAction(error.code as string))
    });
  }
}

export default RegisterUser

