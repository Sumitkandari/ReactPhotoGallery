import React, { useEffect, useState } from "react";
import { projectStorage, projectFireStore } from "../firebase/config";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Timestamp,
  collection,
  serverTimestamp,
  setDoc,
  addDoc,
  doc,
} from "firebase/firestore";

const useStorage = (file,uid) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.trunc(percentage));

        // Let's get a download URL for the file.
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const val=doc(projectFireStore,'images',uid)
        const myCollection=collection(val,'Photoes');
        const response = await addDoc(myCollection, { //addDoc(collection())
          url,
          favourite:false,
           createAt: serverTimestamp(),

        });
        console.log(response);
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
