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
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../../axiosClient';
import { userInfoSelector } from '../../../Auth/authSlice';
import './billedit.scss';

const { Title, Text } = Typography;
const { Option } = Select;

function BillEdit() {
    let params = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [billData, setBillData] = useState();
    const [dateInfo, setDateInfo] = useState();
    const [countDay, setCountDay] = useState(0);
    const [amount, setAmount] = useState(0);

    const userInfo = useSelector(userInfoSelector);
    const [form] = Form.useForm();

    //Fetch bill data
    useEffect(() => {
        async function fetchBill() {
            const res = await axiosClient.get(
                `/orders?id=${params.id}&userId=${userInfo.id}&_expand=vehicle`
            );
            setBillData(res.data[0]);
        }

        fetchBill();
    }, [userInfo, params]);

    //Check loaded
    useEffect(() => {
        if (billData) {
            setIsLoaded(true);
        }
    }, [billData]);

    //Calc days
    useEffect(() => {
        var start = moment(dateInfo?.dateStart || billData?.dateStart, 'DD-MM-YYYY');
        var end = moment(dateInfo?.dateEnd || billData?.dateEnd, 'DD-MM-YYYY');

        //Difference in number of days
        if (moment.duration(end.diff(start)).asDays() === 0) {
            setCountDay(1);
        } else {
            setCountDay(moment.duration(end.diff(start)).asDays());
        }
    }, [dateInfo, billData]);

    //Calc amount
    useEffect(() => {
        if (countDay >= 5) {
            setAmount(billData?.vehicle?.price[3] * countDay);
        } else {
            setAmount(billData?.vehicle?.price[countDay - 1] * countDay);
        }
    }, [countDay, billData?.vehicle?.price]);

    const handleFinish = async (values) => {
        const formData = {
            ...values,
            dateStart: dateInfo?.dateStart || billData.dateStart,
            dateEnd: dateInfo?.dateEnd || billData.dateEnd,
            amount: amount,
        };

        await axiosClient.patch(`/orders/${params.id}`, formData);
        navigate('/bill');
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

    const handleChangeDate = (value, type) => {
        setDateInfo((pre) => ({ ...pre, [type]: value }));
    };

    return (
        <section className='bill-edit'>
            {isLoaded && (
                <div className='container bill-edit__container'>
                    <Form
                        name='bill-edit'
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 20 }}
                        form={form}
                        onFinish={handleFinish}
                        initialValues={{
                            ...billData,
                            dateStart: moment(billData?.dateStart, 'DD-MM-YYYY'),
                            dateEnd: moment(billData?.dateEnd, 'DD-MM-YYYY'),
                        }}
                    >
                        <Row className='bill-edit__row' gutter={48}>
                            <Col className='bill-edit__left' xs={14}>
                                <Title level={2} className='t-center'>
                                    Ch???nh s???a th??ng tin ?????t xe
                                </Title>

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
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nh???p v??o s??? ??i???n tho???i' />
                                </Form.Item>
                                <Form.Item
                                    label='?????a ch???'
                                    name='address'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone address!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nh???p v??o ?????a ch???' />
                                </Form.Item>
                                <Divider orientation='left'>Th??ng tin gi???y t???</Divider>
                                <Form.Item
                                    label='S??? CCCD'
                                    name='cardNum'
                                    rules={[
                                        { required: true, message: 'Please input your card ID!' },
                                    ]}
                                >
                                    <Input placeholder='Nh???p v??o s??? CCCD' />
                                </Form.Item>
                                <Form.Item
                                    name='cardUrl'
                                    label='???nh CCCD'
                                    rules={[
                                        { required: true, message: 'Please upload your card!' },
                                    ]}
                                    getValueFromEvent={getValueEventUpload}
                                    //getValueProps={(value) => console.log(value)}
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
                                <Form.Item wrapperCol={{ offset: 5 }} shouldUpdate>
                                    {() => {
                                        return (
                                            <Image
                                                src={form.getFieldValue('cardUrl')}
                                                width={200}
                                            />
                                        );
                                    }}
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
                                <Form.Item wrapperCol={{ offset: 5 }} shouldUpdate>
                                    {() => {
                                        return (
                                            <Image
                                                src={form.getFieldValue('driverUrl')}
                                                width={200}
                                            />
                                        );
                                    }}
                                </Form.Item>
                            </Col>
                            <Col className='bill-edit__right' xs={10}>
                                <div className='bill-edit__sticky'>
                                    <Title level={2} className='t-center'>
                                        Th??ng tin thu?? xe
                                    </Title>
                                    <div className='bill-edit__card'>
                                        <Image width={150} src={billData?.vehicle?.photoUrl} />
                                        <div className='bill-edit__card-info'>
                                            <Title level={4}>{billData?.vehicle?.name}</Title>

                                            <Select
                                                defaultValue={`1 ng??y - ${billData?.vehicle?.price[0]}/ng??y`}
                                                style={{ width: '100%' }}
                                            >
                                                {billData?.vehicle?.price.map((item, index) => (
                                                    <Option key={index} value={index}>{`${
                                                        index + 1
                                                    } ng??y - ${item}/ng??y`}</Option>
                                                ))}
                                                <Option value={4}>
                                                    +5 ng??y - {billData?.vehicle?.price[3]}/ng??y
                                                </Option>
                                            </Select>
                                        </div>
                                    </div>

                                    <Form.Item
                                        name='dateStart'
                                        label='Ng??y nh???n xe'
                                        labelCol={{ span: 5 }}
                                    >
                                        <DatePicker
                                            className='w-full'
                                            format='DD-MM-YYYY'
                                            onChange={(date, string) => {
                                                handleChangeDate(string, 'dateStart');
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='dateEnd'
                                        label='Ng??y tr??? xe'
                                        labelCol={{ span: 5 }}
                                    >
                                        <DatePicker
                                            className='w-full'
                                            format='DD-MM-YYYY'
                                            onChange={(date, string) => {
                                                handleChangeDate(string, 'dateEnd');
                                            }}
                                        />
                                    </Form.Item>
                                    <div className='bill-edit__result mt-1'>
                                        <Text>S??? ng??y thu??: {countDay}</Text>
                                        <Title level={3}>T???m t??nh: {amount}</Title>
                                    </div>
                                    <Button
                                        type='primary'
                                        onClick={() => form.submit()}
                                        block
                                        size='large'
                                    >
                                        C???p nh???t th??ng tin
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            )}
        </section>
    );
}

export default BillEdit;
