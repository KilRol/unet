import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {collection, getDocs, getFirestore} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type userData = {
  id?: string
  dataId?: string
}

const fetchUserCollection = (field: string, id: string): Promise<userData[]> => {
  return new Promise((resolve) => {
    const fieldRef = collection(db, "users", id, field);
    getDocs(fieldRef).then(e => {
      if (!e.empty) {
        const list: userData[] = [];
        e.forEach(d => {
          list.push({
            id: d.get("id"),
            dataId: d.get("dataId")
          })
        })
        resolve(list)
      }
      resolve([])
    })
  })
}

export default fetchUserCollection
