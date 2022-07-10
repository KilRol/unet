import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {collection, getDocs, getFirestore} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getUserFriendsCollectionList = (field: string, userId: string): Promise<string[]> => {
  return new Promise(resolve => {
    const users: string[] = [];
    const userRef = collection(db, "users", userId, field);
    getDocs(userRef).then((docs) => {
      docs.forEach(e => {
        users.push(e.get("id"))
      })
      resolve(users)
    })
  })
}

export default getUserFriendsCollectionList
