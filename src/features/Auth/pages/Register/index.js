import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../../axiosClient';
import { setUserInfo, userInfoSelector } from '../../authSlice';
import './register.scss';

const { Title } = Typography;

function Register() {
    const userInfo = useSelector(userInfoSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFinish = async (results) => {
        const response = await axiosClient.post('/users', {
            ...results,
            photoURL: userInfo.photoURL,
        });

        const { name, email, photoURL, address, tel, id } = response.data;
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

        navigate('/');
    };

    return (
        <section className='register'>
            <div className='register__container'>
                <Title level={2} className='t-center'>
                    Đăng ký
                </Title>
                <Form
                    name='register'
                    autoComplete='off'
                    labelCol={{ span: 6 }}
                    onFinish={handleFinish}
                    initialValues={{ email: userInfo.email, name: userInfo.name }}
                    scrollToFirstError
                >
                    <Form.Item
                        name='name'
                        label='Tên'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='E-mail'
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='tel'
                        label='Số điện thoại'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        name='address'
                        label='Địa chỉ'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Button type='primary' htmlType='submit' size='large' block>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default Register;
