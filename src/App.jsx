import { useContext, useState } from "react";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import Navbar from "./components/Navbar";
import Favourite from "./components/Favourite";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Login from "./components/login/Login";
import { AuthContext } from "./context/AuthContext";
import Register from "./components/register/Register";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
 const {currentUser}=useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return currentUser ?  children  : <Navigate to="/login" />;
  };

  return (
    <div className="App">
     <HashRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={  <Login />} />
            <Route path="register" element={<Register />} />
            <Route
              index
              element={
                <RequireAuth>
                  
                    <Navbar />
                    <Title />
                    <UploadForm />
                    <ImageGrid setSelectedImg={setSelectedImg} />
                    {selectedImg && (
                      <Modal
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                      />
                    )}
                
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/like"
            element={
              <RequireAuth >
                  <Navbar />
                    <Title />
                    <UploadForm />
              
              <Favourite setSelectedImg={setSelectedImg} />
              {selectedImg && (
                <Modal
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                />
                )}
                </RequireAuth>
                
              
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </HashRouter> 
    </div>
  );
}

export default App;
