import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function Notfound({ status }) {
    return (
        <Result
            status={status}
            style={{ paddingTop: '60px' }}
            title={status}
            subTitle='Sorry, you are not authorized to access this page.'
            extra={
                <Button type='primary'>
                    <Link to='/'>Quay lại trang chủ</Link>
                </Button>
            }
        />
    );
}

export default Notfound;
