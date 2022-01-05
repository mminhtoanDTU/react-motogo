import { Divider, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../../../app/firebase';
import GoogleLogo from '../../../../assets/images/google.svg';
import { setUserInfo } from '../../authSlice';
import './login.scss';

const { Title } = Typography;

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const result = await signInWithGoogle();

        if (result.additionalUserInfo.isNewUser) {
            const { photoURL, email, displayName } = result.user;

            dispatch(setUserInfo({ email, photoURL, name: displayName }));
            navigate('/auth/register');
        } else {
            navigate('/');
        }
    };

    return (
        <section className='login'>
            <div className='login__container'>
                <Title level={2}>Đăng nhập</Title>
                <Divider>Chọn phương thức đăng nhập</Divider>
                <div className='login__btn' onClick={handleLogin}>
                    <img srcSet={`${GoogleLogo} 2x`} className='login__btn-img' alt='google' />
                    <span className='login__btn-text'>Đăng nhập với Google</span>
                </div>
            </div>
        </section>
    );
}

export default Login;
