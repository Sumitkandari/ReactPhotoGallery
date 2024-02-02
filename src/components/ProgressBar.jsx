import React, {  useContext, useEffect } from 'react'
import useStorage from '../hooks/useStorage';
import { AuthContext } from '../context/AuthContext';

const ProgressBar = ({file,setFile}) => {
   const {currentUser}=useContext(AuthContext)
     const {url,progress}=useStorage(file,currentUser.uid);
     console.log(progress,url)
     useEffect(()=>{
        if(url) setFile(null)
     },[url,setFile])
    
  return (
    <div className='progress-bar'>
    <div className='loading' style={{border:"1px solid black",width:progress + '%'}}></div>
    </div>
    
    
  )
}


export default ProgressBar;