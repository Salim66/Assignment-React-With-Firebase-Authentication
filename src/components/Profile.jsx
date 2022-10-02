import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ setAuthCheck }) => {

    const navigate = useNavigate();

    const handleUserLogout = (e) => {

        e.preventDefault();
        sessionStorage.removeItem('auth');
        setAuthCheck(false);
        navigate('/');

    }

  return (
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h1>Successfully Login Your Account</h1>
                <h4>Profile Page</h4>
                <a onClick={ handleUserLogout } href='#'>Logout</a>
            </div>
        </div>
    </div>
  )
};

export default Profile;