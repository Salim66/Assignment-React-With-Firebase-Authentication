import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { app } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



function App() {

  // get auth
  const auth = getAuth(app);

  // Auth check is user login or not
  const [authCheck, setAuthCheck] = useState(true);

  const [user, setUser] = useState(null);
  console.log(user.email);
  // Auth Check Component
  const AuthCheck = ({ children }) => {
    return authCheck ? children : <Navigate to='/' />
  }

  useEffect(() => {
    let ss =  JSON.parse(sessionStorage.getItem('auth'));
    setAuthCheck(ss);

    let userdata = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null);
    })
    return userdata;

  }, [authCheck]);

  return (
    <Routes>
      <Route path="/" element={ <Auth setAuthCheck={setAuthCheck} /> } />
      <Route path="/profile" element={<AuthCheck><Profile setAuthCheck={setAuthCheck} user={ user } /></AuthCheck> } />
    </Routes>
  );
}

export default App;
