import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type userData = {
  id?: string
  dataId?: string
}

const fetchField = (field: string, userId: string, id: string): Promise<userData> => {
  return new Promise((resolve, reject) => {
    const q = query(
      collection(db, "users", userId, field),
      where("id", "==", id)
    )
    getDocs(q).then(e => {
      if (!e.empty) {
        resolve({
          id: e.docs[0].get("id"),
          dataId: e.docs[0].get("dataId")
        })
      }
      reject()
    })
  })
}

export default fetchField
