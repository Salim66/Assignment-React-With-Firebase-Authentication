import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './Auth.scss';
import { app } from '../../firebase.js';
import cogoToast from 'cogo-toast';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
 

const Auth = ({ setAuthCheck }) => {

    // get auth
    const auth = getAuth(app);

    const [res, setRes] = useState({
        email : '',
        username : '',
        password : ''
    });

    const [log, setLog] = useState({
        email : '',
        password : ''
    });

    const [reset, setReset] = useState({
        email: ''
    });

    const navigate = useNavigate();

    const handleRegisterForm = (e) => {
        e.preventDefault();

        if(!res.email || !res.username || !res.password){
            cogoToast.warn('All fiedls are required!');
        }else {

            createUserWithEmailAndPassword(auth, res.email, res.password).then(() => {
                updateProfile(auth.currentUser, {
                    displayName: res.username
                });
            })
            .then(useCredential => {

                cogoToast.success('User Create Successfully');

                setRes({
                    email : '',
                    username : '',
                    password : ''
                });

            }).catch(useCredential => {

                cogoToast.error('Registation Faield!');

            });


        }
    }

    // Login Form Submit Handler
    let handleLoginForm = (e) => {
        e.preventDefault();

        if(!log.email || !log.password){

            cogoToast.warn('All fiedls are required!');

        }else {

            signInWithEmailAndPassword(auth, log.email, log.password).then(userCredential => {

                sessionStorage.setItem('auth', JSON.stringify(true));
                setAuthCheck(true);
                navigate('/profile');

            }).catch(error => {

                cogoToast.error('Login Faield!');

            });

        }

    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if(!reset.email){

            cogoToast.warn('Email field is required!');

        }else {

            await sendPasswordResetEmail(auth, reset.email).then(userCredential => {

                cogoToast.success('Password Reset Link Send Your Email, Please Check!');

            }).catch(error => {

                cogoToast.error('Reset Faield!');

            });

        }

    }


  return (
    <section className="auth__section">
        <div className="container">
            <div className="row container__row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="auth display-flex mt-4 mx-4">
                                <ul class="nav nav-pills mb-3 d-flex justify-content-between" id="pills-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="tab__title active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Login</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="tab__title" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Sign Up</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    {/* Start Login Form */}
                                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <form onSubmit={ handleLoginForm }>
                                            <div className="from-group my-2">
                                                <input type="text" className='form-control' placeholder='Email or username' value={log.email} onChange={ e => setLog({ ...log, email : e.target.value }) } />
                                            </div>
                                            <div className="from-group my-2">
                                                <input type="password" className='form-control' placeholder='Password' value={log.password} onChange={ e => setLog({ ...log, password : e.target.value }) } />
                                            </div>
                                            <div className="from-group my-2">
                                                <label className='remember_me'>
                                                    <input type="checkbox" /> Remember me
                                                    <span class="geekmark"></span>
                                                </label>
                                            </div>
                                            <div className="from-group my-2">
                                                <button className='login__btn'>Login</button>
                                            </div>
                                            <div className="from-group my-2 forget">
                                                <a href="#forget__password" data-toggle="modal" className='forget__pass'><i className='fa fa-arrow-left'></i> <span>Forget your password?</span></a>
                                            </div>
                                        </form>
                                    </div>{/* End Login Form */}

                                    {/* Start Register Form */}
                                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <form onSubmit={ handleRegisterForm }>
                                            <div className="from-group my-2">
                                                <input type="email" name='email' className='form-control' placeholder='Email' value={res.email} onChange={ e => setRes({ ...res, email : e.target.value }) } />
                                            </div>
                                            <div className="from-group my-2">
                                                <input type="text" name='username' className='form-control' placeholder='Username' value={res.username} onChange={ e => setRes({ ...res, username : e.target.value }) } />
                                            </div>
                                            <div className="from-group my-2">
                                                <input type="password" name='password' className='form-control' placeholder='Password' value={res.password} onChange={ e => setRes({ ...res, password : e.target.value }) } />
                                            </div>
                                            <div className="from-group my-4 sign__up">
                                                <button className='login__btn'>Sign Up</button>
                                            </div>
                                        </form>
                                    </div>{/* End Register Form */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal animate__animated animate__fadeInDown" id='forget__password'>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className='recovey__password'>Password Recovery</h5>
                        <p className='recovey__text-one'>Enter either the email address or username on the account and click Submit</p>
                        <p className="recovery__text-two">We'll email instructions on how to reset your password.</p>
                        <form onSubmit={ handleResetPassword }>
                            <div className="form-group">
                                <input type="text" name='email' className='form-control' placeholder='Enter email or username here' value={reset.email} onChange={ e => setReset({ ...reset, email : e.target.value }) } />
                            </div>
                            <div className="form-group recovey">
                                <button type='submit' className='recovey__btn'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
};

export default Auth;