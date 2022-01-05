import React from 'react';
import './layout.scss';
import bg from '../../../../assets/images/H1.png';

function Background({ children }) {
    return (
        <div className="auth">
            <div className="auth__container" style={{ backgroundImage: `url(${bg})` }}>
                {children}
            </div>
        </div>
    );
}

export default Background;
