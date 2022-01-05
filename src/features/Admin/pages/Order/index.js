import {
    DeleteTwoTone,
    EditTwoTone,
    ExclamationCircleOutlined,
    ThunderboltTwoTone,
} from '@ant-design/icons';
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
import ConfirmStatus from '../../components/ConfirmStatus';
import DrawerOrder from '../../components/DrawerOrder';

const { Title } = Typography;
const { confirm } = Modal;

function Order() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const selectedKeys = useSelector(selectedKeysSelector);
    const selectedData = useSelector(selectedDataSelector);
    const isReload = useSelector(isReloadSelector);

    useEffect(() => {
        setIsLoading(true);
        async function fetchOrderList() {
            const res = await axiosClient.get(`/orders?_expand=vehicle&_expand=branch`);
            setOrderList(
                res.data.map((row) => ({
                    key: row.id,
                    ...row,
                }))
            );
            setIsLoading(false);
        }

        fetchOrderList();
    }, [isReload]);

    const handleSetSelectKey = (key) => {
        if (!selectedKeys.includes(key)) {
            dispatch(setSelectKeys([key]));
        }
    };

    const handleOpenDrawer = () => {
        setIsDrawerVisible(true);
    };

    //dispatch row selected to redux
    const handleTableSelected = (selectedKeys, selectedRows) => {
        dispatch(setSelectKeys(selectedKeys));
        dispatch(setSelectedData(selectedRows));
    };

    const handleDeleteOrder = async (currentKey) => {
        if (!selectedKeys.includes(currentKey)) {
            await axiosClient.delete(`/orders/${currentKey}`);
        } else {
            selectedKeys.forEach(async (key) => {
                await axiosClient.delete(`/orders/${key}`);
            });
        }

        dispatch(setIsReload());
    };

    const handleUpdateOrder = async (values) => {
        axiosClient.patch(`/orders/${selectedKeys[0]}`, values);
        dispatch(setIsReload());
        setIsDrawerVisible(false);
    };

    const handleCloseDrawer = () => {
        setIsDrawerVisible(false);
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tel',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Identity Card',
            dataIndex: 'cardNum',
            key: 'cardNum',
        },
        {
            title: 'I.Card Photo',
            dataIndex: 'cardUrl',
            key: 'cardUrl',
            render: (url) => <Image src={url} width={100} />,
        },
        {
            title: 'Driver’s license',
            dataIndex: 'driverNum',
            key: 'driverNum',
        },
        {
            title: 'D.License Photo',
            dataIndex: 'driverUrl',
            key: 'driverUrl',
            render: (url) => <Image src={url} width={100} />,
        },
        {
            title: 'Vehicle Info',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (vehicle) => <span>{vehicle.name}</span>,
        },
        {
            title: 'Branch Info',
            dataIndex: 'branch',
            key: 'branch',
            render: (branch) => <span>{branch.name}</span>,
        },
        {
            title: 'Start',
            dataIndex: 'dateStart',
            key: 'dateStart',
        },
        {
            title: 'End',
            dataIndex: 'dateEnd',
            key: 'dateEnd',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (time) => <span>{moment(time).format('DD-MM-YYYY')}</span>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            fixed: 'right',
            width: 100,
            render: (text) => <strong>{text}đ</strong>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
            width: 100,
            filters: [
                {
                    text: 'Pendding',
                    value: 0,
                },
                {
                    text: 'Success',
                    value: 1,
                },
                {
                    text: 'Completed',
                    value: 2,
                },
                {
                    text: 'Cancel',
                    value: -1,
                },
            ],
            onFilter: (value, record) => record.status === value,
            render: (tag) => (
                <Tag
                    color={tag === -1 ? 'red' : tag === 0 ? 'yellow' : tag === 1 ? 'green' : 'blue'}
                    key={tag}
                >
                    {tag === -1
                        ? 'Cancel'
                        : tag === 0
                        ? 'Pendding'
                        : tag === 1
                        ? 'Success'
                        : 'Completed'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            fixed: 'right',
            width: 140,
            render: (value, rada) => (
                <Space size='middle'>
                    <ConfirmStatus defaultStatus={rada.status}>
                        <Button
                            onClick={() => handleSetSelectKey(value)}
                            shape='circle'
                            icon={<ThunderboltTwoTone twoToneColor='#faad14' />}
                            size='small'
                        />
                    </ConfirmStatus>

                    <Button
                        onClick={handleOpenDrawer}
                        icon={<EditTwoTone twoToneColor='#595959' />}
                        shape='circle'
                        size='small'
                        disabled={
                            (selectedData.length === 1) & (value === selectedKeys[0]) ? false : true
                        }
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
                                    handleDeleteOrder(value);
                                },
                            })
                        }
                        shape='circle'
                        icon={<DeleteTwoTone twoToneColor='#ff4d4f' />}
                        size='small'
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title>Orders</Title>

            <Table
                loading={isLoading}
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    onChange: handleTableSelected,
                }}
                scroll={{ x: 2500 }}
                pagination={{ pageSize: 10 }}
                dataSource={orderList}
                sticky
            />

            <DrawerOrder
                isShow={isDrawerVisible}
                onClose={handleCloseDrawer}
                onUpdate={handleUpdateOrder}
            />
            {/* <ModalOrder
                isOpen={isModalVisible}
                onSubmit={handleModalUpdate}
                onCancel={handleModalCancel}
                form={form}
            /> */}
        </div>
    );
}

export default Order;
