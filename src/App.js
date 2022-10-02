import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Profile from './components/Profile';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function App() {

  // Auth check is user login or not
  const [authCheck, setAuthCheck] = useState(true);

  console.log(authCheck);

  // Auth Check Component
  const AuthCheck = ({ children }) => {
    return authCheck ? children : <Navigate to='/' />
  }

  useEffect(() => {
    let ss =  JSON.parse(sessionStorage.getItem('auth'));
    // console.log(ss);
    setAuthCheck(ss);
  }, [authCheck]);

  return (
    <Routes>
      <Route path="/" element={ <Auth setAuthCheck={setAuthCheck} /> } />
      <Route path="/profile" element={<AuthCheck><Profile setAuthCheck={setAuthCheck} /></AuthCheck> } />
    </Routes>
  );
}

export default App;
