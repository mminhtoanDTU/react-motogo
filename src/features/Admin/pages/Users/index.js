import { DeleteTwoTone, EditTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Modal, Space, Table, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import { isReloadSelector, selectedKeysSelector, setIsReload } from '../../adminSlice';

const { Title } = Typography;
const { confirm } = Modal;

function Users() {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isReload = useSelector(isReloadSelector);
    const selectedKeys = useSelector(selectedKeysSelector);

    useEffect(() => {
        setIsLoading(true);
        async function fetchUserList() {
            const res = await axiosClient.get(`/users`);
            setUserList(
                res.data.map((row) => ({
                    key: row.id,
                    ...row,
                }))
            );
            setIsLoading(false);
        }

        fetchUserList();
    }, [isReload]);

    const handleDeleteUser = async (currentKey) => {
        if (!selectedKeys.includes(currentKey)) {
            await axiosClient.delete(`/users/${currentKey}`);
        } else {
            selectedKeys.forEach(async (key) => {
                await axiosClient.delete(`/users/${key}`);
            });
        }

        dispatch(setIsReload());
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Avatar',
            dataIndex: 'photoURL',
            key: 'photoURL',
            render: (url) => <Avatar src={url} size={48} />,
            width: 100,
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
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (time) => <span>{moment(time).format('DD-MM-YYYY')}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            width: 100,
            render: (value, rada) => (
                <Space size='middle'>
                    <span>
                        <EditTwoTone twoToneColor='#595959' />
                    </span>
                    <span>
                        <DeleteTwoTone
                            twoToneColor='#ff4d4f'
                            onClick={() =>
                                confirm({
                                    title: 'Do you want to delete these items?',
                                    icon: <ExclamationCircleOutlined />,
                                    okText: 'Yes',
                                    okType: 'danger',
                                    cancelText: 'No',
                                    content: 'Đã chọn n item',
                                    onOk() {
                                        handleDeleteUser(value);
                                    },
                                })
                            }
                        />
                    </span>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title>Users</Title>

            <Table
                loading={isLoading}
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys);
                    },
                }}
                dataSource={userList}
            />
        </div>
    );
}

export default Users;
