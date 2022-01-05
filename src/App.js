import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import firebase from './app/firebase';
import axiosClient from './axiosClient';
import { setUserInfo } from './features/Auth/authSlice';

const MainMoto = React.lazy(() => import('./features/MainMoto'));
const Auth = React.lazy(() => import('./features/Auth'));
const Admin = React.lazy(() => import('./features/Admin'));

function App() {
    const dispatch = useDispatch();
    //Check current user
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                axiosClient.get(`/users?email=${user.email}`).then((response) => {
                    if (response.data.length > 0) {
                        const { name, email, photoURL, address, tel, id } = response.data[0];
                        dispatch(
                            setUserInfo({
                                id,
                                name,
                                photoURL,
                                email,
                                address,
                                tel,
                            })
                        );
                    }
                });
            }
        });
    }, [dispatch]);

    return (
        <div className='app'>
            <Routes>
                <Route path='auth/*' element={<Auth />} />
                <Route path='/*' element={<MainMoto />} />
                <Route path='login' element={<Navigate replace to='/auth/login' />} />
                <Route path='admin/*' element={<Admin />} />
            </Routes>
        </div>
    );
}

export default App;
