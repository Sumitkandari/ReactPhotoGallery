import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {dispatch,currentUser}=useContext(AuthContext);

  console.log("Navbar",currentUser)
  function handleLogout(){
    dispatch({type:'LOGOUT'})

  }

  return (
    <div className='nav-bar' >
      <div className='nav_item1'>
        <Link to="/" >Pixelz </Link>
          <Link to="/like" >Like</Link>

      </div>
        <div className="nav-item2">
          {currentUser&&<span className='user-email'>{currentUser.username}</span>}
          <button className='logoutbtn' onClick={handleLogout}>Logout</button>
        </div>
         
    </div>
  )
}

export default Navbar;