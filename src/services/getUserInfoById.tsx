import {collection, doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import User from "../types/User";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getUserInfoById = (id: string): Promise<User> => {
  return new Promise((resolve) => {
    const userRef = collection(db, "users");
    getDoc(doc(userRef, id)).then((user) => {
      resolve(user.data() as User);
    })
  })


};
