import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Image, Modal, Space, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import {
    isReloadSelector,
    selectedDataSelector,
    selectedKeysSelector,
    setIsReload,
    setSelectedData,
    setSelectKeys,
} from '../../adminSlice';
import DrawerNewVehicle from '../../components/DrawerNewVehicle';
import './vehicles.scss';

const { Title } = Typography;
const { confirm } = Modal;

function Vehicles() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [vehicleList, setVehicleList] = useState([]);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const isReload = useSelector(isReloadSelector);
    const selectedData = useSelector(selectedDataSelector);
    const selectedKeys = useSelector(selectedKeysSelector);

    useEffect(() => {
        setIsLoading(true);
        async function fetchUserList() {
            const res = await axiosClient.get(`/vehicles?_expand=branch`);
            setVehicleList(
                res.data.map((row) => ({
                    key: row.id,
                    ...row,
                }))
            );
            setIsLoading(false);
        }

        fetchUserList();
    }, [isReload]);

    const handleCloseDrawer = () => {
        setIsDrawerVisible(false);

        if (isEditable) {
            setIsEditable(false);
        }
    };

    const handleCreateNewVehicle = async (values) => {
        await axiosClient.post('/vehicles', values);
        dispatch(setIsReload());
        setIsDrawerVisible(false);
    };

    const handleTableSelectChange = (selectedKeys, selectedRows) => {
        dispatch(setSelectKeys(selectedKeys));
        dispatch(setSelectedData(selectedRows));
    };

    const handleUpdateVehicle = async (values) => {
        await axiosClient.patch(`/vehicles/${selectedKeys[0]}`, values);
        dispatch(setIsReload());
        setIsDrawerVisible(false);
    };

    const handleDeleteVehicle = async (currentKey) => {
        if (!selectedKeys.includes(currentKey)) {
            await axiosClient.delete(`/vehicles/${currentKey}`);
        } else {
            selectedKeys.forEach(async (key) => {
                await axiosClient.delete(`/vehicles/${key}`);
            });
        }

        dispatch(setIsReload());
    };

    const handleClickUpdate = () => {
        setIsEditable(true);
        setIsDrawerVisible(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            fixed: 'left',
        },
        {
            title: 'Image',
            dataIndex: 'photoUrl',
            key: 'photoUrl',
            width: 200,
            render: (url) => <Image src={url} width={150} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: 300,
        },
        {
            title: 'Branch Info',
            dataIndex: 'branch',
            key: 'branch',
            width: 180,
            render: (branch) => <span>{branch.name}</span>,
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            children: [
                {
                    title: '1 Day',
                    dataIndex: 'price',
                    key: 'price',
                    render: (value) => <span>{value[0]}</span>,
                },
                {
                    title: '2 Day',
                    dataIndex: 'price',
                    key: 'price',
                    render: (value) => <span>{value[1]}</span>,
                },
                {
                    title: '3 Day',
                    dataIndex: 'price',
                    key: 'price',
                    render: (value) => <span>{value[2]}</span>,
                },
                {
                    title: '4 Day',
                    dataIndex: 'price',
                    key: 'price',
                    render: (value) => <span>{value[3]}</span>,
                },
            ],
        },

        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (time) => <span>{moment(time).format('DD-MM-YYYY')}</span>,
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
            width: 100,
            filters: [
                {
                    text: 'Availabel',
                    value: 0,
                },
                {
                    text: 'Rented',
                    value: 1,
                },
            ],
            onFilter: (value, record) => record.status === value,
            render: (tag) => (
                <Tag color={tag === 0 ? 'green' : 'red'} key={tag}>
                    {tag === 0 ? 'Available' : 'Rented'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            width: 100,
            fixed: 'right',
            render: (value, rada) => (
                <Space size='middle'>
                    <Button
                        onClick={handleClickUpdate}
                        disabled={
                            (selectedData.length === 1) & (value === selectedKeys[0]) ? false : true
                        }
                        shape='circle'
                        icon={<EditOutlined />}
                        size='small'
                    />

                    <Button
                        onClick={() =>
                            confirm({
                                title: 'Comfirm Delete?',
                                icon: <ExclamationCircleOutlined />,
                                okText: 'Yes',
                                okType: 'danger',
                                cancelText: 'No',
                                content: `Are you sure you want to delete these ${
                                    selectedKeys.length > 0 ? selectedKeys.length : 1
                                } items?`,
                                onOk() {
                                    handleDeleteVehicle(value);
                                },
                            })
                        }
                        shape='circle'
                        icon={<DeleteOutlined />}
                        size='small'
                        danger
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className='vehicle__top'>
                <Title>Vehicles</Title>

                <Button size='large' type='default' onClick={() => setIsDrawerVisible(true)}>
                    Create new
                </Button>
            </div>

            <Table
                loading={isLoading}
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    onChange: handleTableSelectChange,
                }}
                dataSource={vehicleList}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1600 }}
                sticky
            />

            <DrawerNewVehicle
                isShow={isDrawerVisible}
                isEditable={isEditable}
                onClose={handleCloseDrawer}
                onSubmit={handleCreateNewVehicle}
                onUpdate={handleUpdateVehicle}
            />
        </div>
    );
}

export default Vehicles;
