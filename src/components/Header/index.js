import { Avatar, Button, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../app/firebase';
import Logo from '../../assets/images/logo.svg';
import { logout, userInfoSelector } from '../../features/Auth/authSlice';
import './header.scss';

function Header() {
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const userInfo = useSelector(userInfoSelector);

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        auth.signOut();
    };

    const popOverContent = (
        <ul className='header__pop-list'>
            <li className=''>
                <span className='header__pop-name header__pop-item'>Chào, {userInfo.name}</span>
            </li>
            <li className=''>
                <Link to={'/bill'} className='header__pop-item'>
                    Hóa đơn
                </Link>
            </li>
            <li className=''>
                <span className='header__pop-item' onClick={handleLogout}>
                    Đăng xuất
                </span>
            </li>
        </ul>
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className='container header__container'>
                <Link to='/'>
                    <img src={Logo} alt='logo' />
                </Link>
                <ul className='header__nav'>
                    <li>
                        <NavLink to='/search'>Tìm kiếm</NavLink>
                    </li>
                    <li>
                        <NavLink to='/policy'>Chính sách</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/about'>Giới thiệu</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>Liên hệ</NavLink>
                    </li>
                    <li>
                        <NavLink to='/blog'>Blog du lịch</NavLink>
                    </li> */}
                    {Object.keys(userInfo).length !== 0 ? (
                        <Popover content={popOverContent} trigger='click' placement='bottomRight'>
                            <Avatar size={40} src={userInfo.photoURL} />
                        </Popover>
                    ) : (
                        <Button type='primary' size='large'>
                            <Link to='/auth/login'>Đăng nhập</Link>
                        </Button>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
