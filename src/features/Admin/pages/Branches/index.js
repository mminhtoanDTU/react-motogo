import { DeleteTwoTone, EditTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space, Table, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import { isReloadSelector } from '../../adminSlice';

const { Title } = Typography;
const { confirm } = Modal;

function Branches() {
    const [branchList, setBranchList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isReload = useSelector(isReloadSelector);

    useEffect(() => {
        setIsLoading(true);
        async function fetchUserList() {
            const res = await axiosClient.get(`/branches`);
            setBranchList(
                res.data.map((row) => ({
                    key: row.id,
                    ...row,
                }))
            );
            setIsLoading(false);
        }

        fetchUserList();
    }, [isReload]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
                                        // handleDeleteOrder(value);
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
            <Title>Branches</Title>

            <Table
                loading={isLoading}
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys);
                    },
                }}
                dataSource={branchList}
            />
        </div>
    );
}

export default Branches;
