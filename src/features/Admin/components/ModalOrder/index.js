import { Form, Modal } from 'antd';
import React, { memo, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import { selectedKeysSelector } from '../../adminSlice';

function ModalOrder({ isOpen, onSubmit, onCancel, form }) {
    const [loaded, setLoaded] = useState(false);
    const [initValue, setInitValue] = useState({});
    const selectedKeys = useSelector(selectedKeysSelector);

    useLayoutEffect(() => {
        async function fetchOrderValue() {
            const res = await axiosClient.get(`/orders/${selectedKeys[0]}`);
            setInitValue(res.data);
            setLoaded(true);
        }

        fetchOrderValue();
    }, [selectedKeys]);

    return (
        <Modal
            title={`Update order #${selectedKeys[0]}`}
            visible={isOpen}
            onOk={onSubmit}
            onCancel={onCancel}
        >
            {loaded && (
                <Form
                    autoComplete='off'
                    form={form}
                    name='form_in_modal'
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    initialValues={initValue}
                ></Form>
            )}
        </Modal>
    );
}

export default memo(ModalOrder);
