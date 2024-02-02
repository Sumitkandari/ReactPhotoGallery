import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { projectFireStore } from "../firebase/config";

const useFirestore = (storeName,uid) => {
  console.log("inside firestore",uid)
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const collectionVal=doc(projectFireStore,storeName,uid)
    const q = query(collection(collectionVal, 'Photoes'));//, orderBy("createAt","desc")
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        let documents = [];
        console.log("query snapshot",querySnapshot)
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        console.log("snapshotdocs",documents)
        setDocs(documents);
      }
    );
    return () => unsub();
  }, [storeName]);
  return  {docs };
};
export default useFirestore;
