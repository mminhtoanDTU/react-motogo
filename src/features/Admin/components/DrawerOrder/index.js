import { Button, Drawer, Form, Input, Space } from 'antd';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedDataSelector } from '../../adminSlice';

function DrawerOrder({ isShow, onClose, onUpdate }) {
    const [form] = Form.useForm();
    const selectedData = useSelector(selectedDataSelector);

    useEffect(() => {
        form.setFieldsValue(selectedData[0]);
    }, [isShow, form, selectedData]);

    return (
        <Drawer
            title={'Update the order'}
            width={500}
            closable={false}
            onClose={() => {
                form.resetFields();
                onClose();
            }}
            visible={isShow}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
                <Space>
                    <Button
                        onClick={() => {
                            form.resetFields();
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => form.submit()} type='primary'>
                        Update
                    </Button>
                </Space>
            }
        >
            <Form
                form={form}
                layout='vertical'
                name='order'
                onFinish={(value) => {
                    onUpdate(value);
                }}
            >
                <Form.Item label='Name' name='name'>
                    <Input />
                </Form.Item>
                <Form.Item label='Phone' name='tel'>
                    <Input />
                </Form.Item>
                <Form.Item label='Address' name='address'>
                    <Input />
                </Form.Item>
                <Form.Item label='Card Number' name='cardNum'>
                    <Input />
                </Form.Item>
                <Form.Item label='Driver Number' name='driverNum'>
                    <Input />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default memo(DrawerOrder);
