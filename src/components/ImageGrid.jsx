import React, { useContext, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCross, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { add, deleteStateAsync, updateStateAsync } from "../Redux/Context";
import { AuthContext } from "../context/AuthContext";
import { MdDelete } from "react-icons/md";

const ImageGrid = ({ setSelectedImg }) => {
  const {currentUser}=useContext(AuthContext)
  const { docs } = useFirestore("images",currentUser.uid);
  const dispatch = useDispatch();
  console.log("render")
  function handleClick(doc) {
    const temp = { ...doc };
    temp.favourite = temp.favourite ? false : true;
    console.log("Inside Image Grid DOc",temp," DOc",doc);
    dispatch(updateStateAsync({temp,uid:currentUser.uid}));
  }
  function handleDelete(doc){
    const temp={...doc};
    dispatch(deleteStateAsync({temp,uid:currentUser.uid}))
  }
  useEffect(() => {
    console.log("efect", docs);
    if (docs) dispatch(add(docs));
  }, [docs]);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => {
          return (
            <motion.div
              className="img-wrap"
              key={doc.id}
              whileHover={{ opacity: 1 }}
              layout
            >
              <FaHeart
                className="icon"
                style={{ color: doc.favourite ? "red" : "grey" }}
                onClick={() => handleClick(doc)}
              />
              <MdDelete className="icon2" onClick={()=>handleDelete(doc)} />


              <motion.img
                src={doc.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setSelectedImg(doc.url)}
              />
            </motion.div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
