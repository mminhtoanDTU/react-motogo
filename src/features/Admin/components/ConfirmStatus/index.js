import { Popconfirm, Radio, Space, Tag } from 'antd';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import { selectedKeysSelector, setIsReload } from '../../adminSlice';

function ConfirmStatus({ children, defaultStatus }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(defaultStatus);
    const selectedKeys = useSelector(selectedKeysSelector);

    const handleUpdateStatus = async () => {
        selectedKeys.forEach(async (key) => {
            await axiosClient.patch(`/orders/${key}`, { status: status });
        });

        dispatch(setIsReload());
    };

    const handleCancelStatus = () => {};

    return (
        <Popconfirm
            title={
                <Radio.Group defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                    <Space direction='vertical'>
                        <Radio value={0}>
                            <Tag color='yellow'>Pendding</Tag>
                        </Radio>
                        <Radio value={1}>
                            <Tag color='green'>Success</Tag>
                        </Radio>
                        <Radio value={2}>
                            <Tag color='blue'>Completed</Tag>
                        </Radio>
                        <Radio value={-1}>
                            <Tag color='red'>Cancel</Tag>
                        </Radio>
                    </Space>
                </Radio.Group>
            }
            placement='leftTop'
            icon={false}
            okText='Update'
            cancelText='Cancel'
            onConfirm={handleUpdateStatus}
            onCancel={handleCancelStatus}
        >
            {children}
        </Popconfirm>
    );
}

export default memo(ConfirmStatus);
