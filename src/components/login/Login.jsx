import React, { useContext, useState } from "react";
import { projectAuth, projectFireStore } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [dataField, setDataField] = useState({
    username: "",
    password: "",
  });
  const [errorField,setErrorField]=useState({})
  console.log(dataField);
  async function handleSubmit(e) {
    e.preventDefault();
    if((dataField.username&&dataField.password)){
      try {
        const res = await signInWithEmailAndPassword(
          projectAuth,
          dataField.username,
          dataField.password
        );
        const docRef = doc(projectFireStore, "users", res.user.uid);
        const result = await getDoc(docRef);
        dispatch({ type: "LOGIN", payload: { ...res.user, ...result.data() } });
        setError(false);
  
        navigate("/");
        if (result.exists()) {
          console.log("Document data:", result.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        console.log("Inside hand;lesubmit", res);
      } catch (error) {
        // .then((userCredential) => {
        //   // Signed in
        //   const response = userCredential.user;
        //   const user={...response,}
        //   // ...
        // })
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
      }
    }
      else{
        let temp={};
      if(!dataField.username) {
        temp={"username":"Username cannot be blank"}
      }
      if(!dataField.password){
        temp={...temp,"password":"Password cannot be blank"}
      }
      setErrorField({...temp})

      }

    
   
   
  }
  return (
    <div className="login">
      <div className="login-img">
        <img
          src="src\images\zarak-khan-v263clVYq-4-unsplash-1800x2700.jpg"
          alt=""
        />
      </div>
      <div className="login-form">
        <h2 className="title" >LOGIN</h2> 
        <form onSubmit={handleSubmit}>
          <label htmlFor="" className="labelinp" >Email</label>
          <input
            type="text"
            placeholder="Email..."
            value={dataField.username}
            onChange={(e) =>
              setDataField({ ...dataField, username: e.target.value })
            }
          />
          {errorField.username&&<span className="loginerror">{errorField.username}</span>}
            <label htmlFor="" className="labelinp" >Password</label>
          <input
            type="password"
            placeholder="Password..."
            value={dataField.password}
            onChange={(e) =>
              setDataField({ ...dataField, password: e.target.value })
            }
          />
          {errorField.password&&<span className="loginerror">{errorField.password}</span>}
          <button>Login</button>
          {error ? <span>Wrong username or password</span> : ""}
        </form>
        <h2 className="logintoreg" >Want to create an account? <Link to="/register">Register</Link> </h2>
      </div>
    </div>
  );
};

export default Login;
