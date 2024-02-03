import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStateAsync, updateStateAsync } from "../Redux/Context";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { MdDelete } from "react-icons/md";
const Favourite = ({ setSelectedImg }) => {
  const data = useSelector((state) => state.root);
  const { currentUser } = useContext(AuthContext);
  console.log("Inside favourite", data);
  const dispatch = useDispatch();
  function handleClick(doc) {
    const temp = { ...doc };
    temp.favourite = temp.favourite ? false : true;
    console.log(doc);
    dispatch(updateStateAsync({ temp, uid: currentUser.uid }));
  }
  function handleDelete(doc) {
    const temp = { ...doc};
    dispatch(deleteStateAsync({ temp, uid: currentUser.uid }));
  }
  // useEffect(() => {
  //   console.log("efect", docs);
  //   if (docs) dispatch(add(docs));
  // }, [docs]);
  return (
    <div className="img-grid">
      {data &&
        data
          .filter((doc) => doc.favourite === true)
          .map((response) => {
            return (
              <motion.div
                className="img-wrap"
                key={response.id}
                whileHover={{ opacity: 1 }}
                layout
              >
                <FaHeart
                  className="icon"
                  style={{ color: response.favourite ? "red" : "grey" }}
                  onClick={() => handleClick(response)}
                />
                <MdDelete className="icon2" onClick={() => handleDelete(response)} />
                <motion.img
                  src={response.url}
                  alt="uploaded pic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={(e) => setSelectedImg(response.url)}
                />
              </motion.div>
            );
          })}
    </div>
  );
};

export default Favourite;
