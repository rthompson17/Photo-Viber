import React, { useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import FeedPage from '../FeedPage/FeedPage'; 
import ProfilePage from '../ProfilePage/ProfilePage';
// import Switch from 'react-ios-switch'
// import Advanced from './examples/Advanced'
// import Simple from './examples/Simple'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [user, setUser] = useState(userService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo
  
  // TINDER SWIPE CARDS TEST CONST START//
  const [showAdvanced, setShowAdvanced] = useState(true)
  // TINDER SWIPE CARDS TEST CONST END//

  function handleSignUpOrLogin(){
    setUser(userService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  // TINDER SWIPE TEST START //



    // TINDER SWIPE TEST END //

  if (user) {
    return (
      <Routes>
        <Route 
          path="/" 
          element={<FeedPage user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      <Route path="/:username" element={<ProfilePage user={user} handleLogout={handleLogout} />} />
    </Routes>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
