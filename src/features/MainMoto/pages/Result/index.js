import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResultPage() {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const time = setTimeout(() => {
            setCount((pre) => pre - 1);
        }, 1000);

        if (count === 0) {
            navigate('/');
        }

        return () => clearTimeout(time);
    }, [count]);

    return (
        <Result
            style={{ paddingTop: '100px' }}
            status='success'
            title='Đặt chỗ thành công'
            subTitle='Vui lòng đến cửa hàng đúng ngày để hoàn tất thủ tục thuê xe.'
            extra={[
                <Button type='primary' key='console'>
                    <Link to='/'>Trở lại trang chủ sau ({count})</Link>
                </Button>,
            ]}
        />
    );
}

export default ResultPage;
