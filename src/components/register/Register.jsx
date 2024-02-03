import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectAuth, projectFireStore } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import register from "../../images/register.jpg"

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState({})
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    if((data.username&&data.email&&data.password)){
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        data.email,
        data.password
      );
      setSuccess(true)
      await setDoc(doc(projectFireStore, "users", res.user.uid), {
        username: data.username,
      });

    }else{
      let temp={};
      if(!data.username) {
        temp={"username":"Username cannot be blank"}
      }
      if(!data.email){
        temp={...temp,"email":"Email cannot be blank"}
      }
      if(!data.password){
        temp={...temp,"password":"Password cannot be blank"}
      }
      setError({...temp})
    }
    
    console.log(res);
  }
  return (
    <div className="register">
      {success&&<span className="success-msg">Registration Successful</span>}
      <div className="register-form">
        <h2 className="title">REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="" className="labelinp">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter you name"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          {error.username&&<span className="regerror">{error.username}</span>}
          <label htmlFor="" className="labelinp">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter email....."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {error.email&&<span className="regerror">{error.email}</span>}
          <label htmlFor="" className="labelinp">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {error.password&&<span className="regerror">{error.password}</span>}
          <button>Register</button>
        </form>
        <span className="regtologin">Have an account? <Link to="/login">login</Link></span>
      </div>
      <div className="register-img">
        <img src={register} alt="" />
      </div>
    </div>
  );
};

export default Register;
