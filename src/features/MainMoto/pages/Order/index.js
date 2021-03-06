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
                            Th??ng tin kh??ch h??ng
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
                            <Divider orientation='left'>Th??ng tin c?? nh??n</Divider>
                            <Form.Item
                                label='H??? t??n'
                                name='name'
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input placeholder='Nh???p v??o t??n' />
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
                                <Input placeholder='Nh???p v??o email' />
                            </Form.Item>
                            <Form.Item
                                label='S??? ??i???n tho???i'
                                name='tel'
                                rules={[
                                    { required: true, message: 'Please input your phone number!' },
                                ]}
                            >
                                <Input placeholder='Nh???p v??o s??? ??i???n tho???i' />
                            </Form.Item>
                            <Form.Item
                                label='?????a ch???'
                                name='address'
                                rules={[
                                    { required: true, message: 'Please input your phone address!' },
                                ]}
                            >
                                <Input placeholder='Nh???p v??o ?????a ch???' />
                            </Form.Item>
                            <Divider orientation='left'>Th??ng tin gi???y t???</Divider>
                            <Form.Item
                                label='S??? CCCD'
                                name='cardNum'
                                rules={[{ required: true, message: 'Please input your card ID!' }]}
                            >
                                <Input placeholder='Nh???p v??o s??? CCCD' />
                            </Form.Item>
                            <Form.Item
                                name='cardUrl'
                                label='???nh CCCD'
                                rules={[{ required: true, message: 'Please upload your card!' }]}
                                getValueFromEvent={getValueEventUpload}
                            >
                                <Upload
                                    listType='picture'
                                    accept='image/*'
                                    customRequest={uploadImage}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>T???i ???nh l??n</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label='S??? b???ng l??i xe'
                                name='driverNum'
                                rules={[
                                    { required: true, message: 'Please input your driver ID!' },
                                ]}
                            >
                                <Input placeholder='Nh???p v??o s??? b???ng l??i' />
                            </Form.Item>
                            <Form.Item
                                name='driverUrl'
                                label='???nh b???ng l??i xe'
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
                                    <Button icon={<UploadOutlined />}>T???i ???nh l??n</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col className='order__right' xs={10}>
                        <div className='order__sticky'>
                            <Title level={2} className='t-center'>
                                Th??ng tin thu?? xe
                            </Title>
                            <div className='order__card'>
                                <Image width={150} src={vehicleInfo.photoUrl} />
                                <div className='order__card-info'>
                                    <Title level={4}>{vehicleInfo.name}</Title>

                                    <Select
                                        defaultValue={`1 ng??y - ${vehicleInfo.price[0]}/ng??y`}
                                        style={{ width: '100%' }}
                                    >
                                        {/* <Option value="lucy">Lucy</Option> */}
                                        {vehicleInfo.price.map((item, index) => (
                                            <Option key={index} value={index}>{`${
                                                index + 1
                                            } ng??y - ${item}/ng??y`}</Option>
                                        ))}
                                        <Option value={4}>
                                            +5 ng??y - {vehicleInfo.price[3]}/ng??y
                                        </Option>
                                    </Select>
                                </div>
                            </div>

                            <Form.Item name='dateStart' label='Ng??y nh???n xe' labelCol={{ span: 5 }}>
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
                            <Form.Item name='dateEnd' label='Ng??y tr??? xe' labelCol={{ span: 5 }}>
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
                                <Text>S??? ng??y thu??: {countDay}</Text>
                                <Title level={3}>T???m t??nh: {amount}</Title>
                            </div>
                            <Button type='primary' onClick={() => form.submit()} block size='large'>
                                X??c nh???n thu?? xe
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Order;
