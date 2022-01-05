import React from 'react';
import './footer.scss';

function Footer() {
    return (
        <section className='footer'>
            <div className='container'>
                <p className='footer__title'>
                    Made with 💛 by{' '}
                    <a href='https://toandev.tk' target='_blank'>
                        toandev.tk
                    </a>
                </p>
            </div>
        </section>
    );
}

export default Footer;
