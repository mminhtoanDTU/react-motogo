import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Background from './components/Background';
import Login from './pages/Login';
import Register from './pages/Register';

function Auth() {
    return (
        <Background>
            <Routes>
                <Route index element={<Navigate replace to="login" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </Background>
    );
}

export default Auth;
