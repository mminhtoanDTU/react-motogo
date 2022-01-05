import { Button, Drawer, Form, Image, Input, InputNumber, Select, Space } from 'antd';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedDataSelector } from '../../adminSlice';

const { Option, OptGroup } = Select;

function DrawerNewVehicle({ onClose, onSubmit, onUpdate, isEditable, isShow }) {
    const [form] = Form.useForm();
    const selectedData = useSelector(selectedDataSelector);

    useEffect(() => {
        if (isEditable) {
            form.setFieldsValue(selectedData[0]);
        }
    }, [isShow]);

    return (
        <Drawer
            title={isEditable ? 'Update the vehicle' : 'Create a new vehicle'}
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
                        {isEditable ? 'Update' : 'Submit'}
                    </Button>
                </Space>
            }
        >
            <Form
                layout='vertical'
                name='vehicle'
                form={form}
                hideRequiredMark
                onFinish={(value) => {
                    if (isEditable) {
                        onUpdate({ ...value, price: Object.values(value.price) });
                    } else {
                        onSubmit({ ...value, price: Object.values(value.price), status: 0 });
                    }
                }}
            >
                <Form.Item label='Name' name='name'>
                    <Input placeholder='Please enter name vehicle' />
                </Form.Item>
                <Form.Item label='Description' name='desc'>
                    <Input.TextArea
                        autoSize={{ minRows: 2, maxRows: 5 }}
                        placeholder='Please enter description vehicle'
                    />
                </Form.Item>
                <Form.Item label='Photo Url' name='photoUrl'>
                    <Input.TextArea
                        autoSize={{ minRows: 2, maxRows: 5 }}
                        placeholder='Please enter description vehicle'
                        allowClear
                    />
                </Form.Item>
                <Form.Item label='Preview' shouldUpdate>
                    {() => {
                        return <Image src={form.getFieldValue('photoUrl')} />;
                    }}
                </Form.Item>
                <Form.Item label='Branch' name='branchId'>
                    <Select placeholder='Please select branch'>
                        <OptGroup label='Da Nang'>
                            <Option value={1}>
                                Chi nhánh 1 (254 Nguyễn Văn Linh, Thạc Gián, Thanh Khê)
                            </Option>
                            <Option value={2}>
                                Chi nhánh 2 (46 Điện Biên Phủ, Chính Gián, Thanh Khuê)
                            </Option>
                            <Option value={3}>
                                Chi nhánh 3 (03 Quang Trung, Hải Châu 1, Hải Châu)
                            </Option>
                        </OptGroup>
                        <OptGroup label='Hoi An'>
                            <Option value={4}>
                                Chi nhánh 1 (Thái Phiên, Phường Minh An, Hội An )
                            </Option>
                            <Option value={5}>Chi nhánh 2 (Hai Bà Trưng, Cẩm Sơn, Hội An )</Option>
                        </OptGroup>
                    </Select>
                </Form.Item>
                <Form.Item label='Prices'>
                    <Input.Group compat>
                        <Form.Item name={['price', '0']} noStyle>
                            <InputNumber placeholder='First day' style={{ width: '25%' }} />
                        </Form.Item>
                        <Form.Item name={['price', '1']} noStyle>
                            <InputNumber placeholder='Second day' style={{ width: '25%' }} />
                        </Form.Item>
                        <Form.Item name={['price', '2']} noStyle>
                            <InputNumber placeholder='Third day' style={{ width: '25%' }} />
                        </Form.Item>
                        <Form.Item name={['price', '3']} noStyle>
                            <InputNumber placeholder='Fourth day' style={{ width: '25%' }} />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item name='status' label='Status'>
                    <Select placeholder='Select a option'>
                        <Option value={0}>Available</Option>
                        <Option value={1}>Rented</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default memo(DrawerNewVehicle);
