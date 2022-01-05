import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Image,
    Input,
    Row,
    Select,
    Typography,
    Upload,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotFound } from '../../../../components';
import { userInfoSelector } from '../../../Auth/authSlice';
import axiosClient from '../../../../axiosClient';
import {
    branchInfoSelector,
    searchInfoSelector,
    setSearchInfo,
    vehicleInfoSelector,
} from '../../motoSlice';
import './order.scss';

const { Title, Text } = Typography;
const { Option } = Select;

function Order() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [countDay, setCountDay] = useState(0);
    const [form] = Form.useForm();
    const vehicleInfo = useSelector(vehicleInfoSelector);
    const searchInfo = useSelector(searchInfoSelector);
    const userInfo = useSelector(userInfoSelector);
    const branchInfo = useSelector(branchInfoSelector);

    useEffect(() => {
        if (searchInfo.dateStart && searchInfo.dateEnd) {
            var start = moment(searchInfo.dateStart, 'DD-MM-YYYY');
            var end = moment(searchInfo.dateEnd, 'DD-MM-YYYY');

            //Difference in number of days
            setCountDay(moment.duration(end.diff(start)).asDays());
        }
    }, [searchInfo]);

    useEffect(() => {
        if (Object.keys(vehicleInfo).length !== 0) {
            if (countDay >= 5) {
                setAmount(vehicleInfo?.price[3] * countDay);
            } else {
                setAmount(vehicleInfo?.price[countDay - 1] * countDay);
            }
        }
    }, [countDay, vehicleInfo]);

    const handleFinish = async (data) => {
        const formData = {
            ...data,
            userId: userInfo.id,
            branchId: branchInfo.id,
            vehicleId: vehicleInfo.id,
            dateStart: searchInfo.dateStart,
            dateEnd: searchInfo.dateEnd,
            amount: amount,
            status: 0,
        };

        await axiosClient.post('/orders', formData);
        await axiosClient.patch(`/vehicles/${vehicleInfo.id}`, { status: 1 });
        navigate('/result');
    };

    const handleChangeDate = (value, type) => {
        dispatch(setSearchInfo({ ...searchInfo, [type]: value }));
    };

    const uploadImage = async ({ onSuccess, onError, file, onProgress }) => {
        const fmData = new FormData();
        fmData.append('file', file);
        fmData.append('upload_preset', 'ljjqctk4');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/toanlee/image/upload',
                fmData
            );
            onSuccess(response);
        } catch (error) {
            console.log('Eroor: ', error);
            onError({ error });
        }
    };

    const getValueEventUpload = (e) => {
        let resCloudinary = '';
        if (e.file.response) {
            resCloudinary = e.file.response.data.url;
        }

        return resCloudinary;
    };

    if (Object.keys(vehicleInfo).length === 0) {
        return <NotFound status='403' />;
    }

    return (
        <section className='order'>
            <div className='container order__container'>
                <Row className='order__row' gutter={48}>
                    <Col className='order__left' xs={14}>
                        <Title level={2} className='t-center'>
                            Thông tin khách hàng
                        </Title>
                        <Form
                            name='order'
                            autoComplete='off'
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            form={form}
                            onFinish={handleFinish}
                            initialValues={userInfo}
                        >
                            <Divider orientation='left'>Thông tin cá nhân</Divider>
                            <Form.Item
                                label='Họ tên'
                                name='name'
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input placeholder='Nhập vào tên' />
                            </Form.Item>
                            <Form.Item
                                label='E-mail'
                                name='email'
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    { required: true, message: 'Please input your email!' },
                                ]}
                            >
                                <Input placeholder='Nhập vào email' />
                            </Form.Item>
                            <Form.Item
                                label='Số điện thoại'
                                name='tel'
                                rules={[
                                    { required: true, message: 'Please input your phone number!' },
                                ]}
                            >
                                <Input placeholder='Nhập vào số điện thoại' />
                            </Form.Item>
                            <Form.Item
                                label='Địa chỉ'
                                name='address'
                                rules={[
                                    { required: true, message: 'Please input your phone address!' },
                                ]}
                            >
                                <Input placeholder='Nhập vào địa chỉ' />
                            </Form.Item>
                            <Divider orientation='left'>Thông tin giấy tờ</Divider>
                            <Form.Item
                                label='Số CCCD'
                                name='cardNum'
                                rules={[{ required: true, message: 'Please input your card ID!' }]}
                            >
                                <Input placeholder='Nhập vào số CCCD' />
                            </Form.Item>
                            <Form.Item
                                name='cardUrl'
                                label='Ảnh CCCD'
                                rules={[{ required: true, message: 'Please upload your card!' }]}
                                getValueFromEvent={getValueEventUpload}
                            >
                                <Upload
                                    listType='picture'
                                    accept='image/*'
                                    customRequest={uploadImage}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label='Số bằng lái xe'
                                name='driverNum'
                                rules={[
                                    { required: true, message: 'Please input your driver ID!' },
                                ]}
                            >
                                <Input placeholder='Nhập vào số bằng lái' />
                            </Form.Item>
                            <Form.Item
                                name='driverUrl'
                                label='Ảnh bằng lái xe'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload your driver license!',
                                    },
                                ]}
                                getValueFromEvent={getValueEventUpload}
                            >
                                <Upload
                                    listType='picture'
                                    accept='image/*'
                                    customRequest={uploadImage}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col className='order__right' xs={10}>
                        <div className='order__sticky'>
                            <Title level={2} className='t-center'>
                                Thông tin thuê xe
                            </Title>
                            <div className='order__card'>
                                <Image width={150} src={vehicleInfo.photoUrl} />
                                <div className='order__card-info'>
                                    <Title level={4}>{vehicleInfo.name}</Title>

                                    <Select
                                        defaultValue={`1 ngày - ${vehicleInfo.price[0]}/ngày`}
                                        style={{ width: '100%' }}
                                    >
                                        {/* <Option value="lucy">Lucy</Option> */}
                                        {vehicleInfo.price.map((item, index) => (
                                            <Option key={index} value={index}>{`${
                                                index + 1
                                            } ngày - ${item}/ngày`}</Option>
                                        ))}
                                        <Option value={4}>
                                            +5 ngày - {vehicleInfo.price[3]}/ngày
                                        </Option>
                                    </Select>
                                </div>
                            </div>

                            <Form.Item name='dateStart' label='Ngày nhận xe' labelCol={{ span: 5 }}>
                                <DatePicker
                                    className='w-full'
                                    format='DD-MM-YYYY'
                                    disabledDate={(current) => current < moment().startOf('day')}
                                    onChange={(date, string) => {
                                        // setDate((pre) => ({ ...pre, start: string }));
                                        handleChangeDate(string, 'dateStart');
                                    }}
                                    defaultValue={
                                        searchInfo.dateStart
                                            ? moment(searchInfo.dateStart, 'DD-MM-YYYY')
                                            : ''
                                    }
                                />
                            </Form.Item>
                            <Form.Item name='dateEnd' label='Ngày trả xe' labelCol={{ span: 5 }}>
                                <DatePicker
                                    className='w-full'
                                    format='DD-MM-YYYY'
                                    disabledDate={(current) =>
                                        current && current < moment().startOf('day')
                                    }
                                    onChange={(date, string) => {
                                        handleChangeDate(string, 'dateEnd');
                                    }}
                                    defaultValue={
                                        searchInfo.dateEnd
                                            ? moment(searchInfo.dateEnd, 'DD-MM-YYYY')
                                            : ''
                                    }
                                />
                            </Form.Item>
                            <div className='order__result mt-1'>
                                <Text>Số ngày thuê: {countDay}</Text>
                                <Title level={3}>Tạm tính: {amount}</Title>
                            </div>
                            <Button type='primary' onClick={() => form.submit()} block size='large'>
                                Xác nhận thuê xe
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Order;
