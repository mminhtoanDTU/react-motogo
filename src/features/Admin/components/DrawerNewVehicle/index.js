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
    }, [isShow, form, isEditable, selectedData]);

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
                                Chi nh??nh 1 (254 Nguy???n V??n Linh, Th???c Gi??n, Thanh Kh??)
                            </Option>
                            <Option value={2}>
                                Chi nh??nh 2 (46 ??i???n Bi??n Ph???, Ch??nh Gi??n, Thanh Khu??)
                            </Option>
                            <Option value={3}>
                                Chi nh??nh 3 (03 Quang Trung, H???i Ch??u 1, H???i Ch??u)
                            </Option>
                        </OptGroup>
                        <OptGroup label='Hoi An'>
                            <Option value={4}>
                                Chi nh??nh 1 (Th??i Phi??n, Ph?????ng Minh An, H???i An )
                            </Option>
                            <Option value={5}>Chi nh??nh 2 (Hai B?? Tr??ng, C???m S??n, H???i An )</Option>
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
