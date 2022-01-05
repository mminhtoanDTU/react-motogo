import { Button, Image, Popconfirm, Typography } from 'antd';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './billitem.scss';

const { Title } = Typography;

function BillItem({ data, onCancel }) {
    const { id, branch, status, vehicle, dateStart, dateEnd, amount } = data;
    const navigate = useNavigate();

    return (
        <div className='bill-item'>
            <div className='bill-item__p-20'>
                <div className='bill-item__head'>
                    <div className='bill-item__head-info'>
                        <Title level={5}>{branch.name}</Title>
                        <p className='bill-item__text'>
                            <strong>Địa chỉ:</strong> {branch.address}
                        </p>
                    </div>
                    <span
                        className={`bill-item__head-status ${
                            status === -1
                                ? 'cancel'
                                : status === 0
                                ? 'pendding'
                                : status === 1
                                ? 'success'
                                : 'complete'
                        }`}
                    >
                        {status === -1
                            ? 'Đã hủy'
                            : status === 0
                            ? 'Đang chờ'
                            : status === 1
                            ? 'Đã duyệt'
                            : 'Hoàn thành'}
                    </span>
                </div>
                <div className='bill-item__body d-flex'>
                    <Image src={vehicle.photoUrl} width={150} preview={false} />
                    <div className='bill-item__body-info'>
                        <Title level={4}>{vehicle.name}</Title>
                        <p className='bill-item__text'>
                            <strong>Phụ kiện đi kèm: </strong>Mũ bảo hiểm, Dây đeo phản quang, Áo
                            mưa rời, Baga sau, bộ dụng cụ vá xe.
                        </p>
                    </div>
                </div>
            </div>
            <div className='bill-item__foot bill-item__p-20'>
                <p className='bill-item__text' level={5}>
                    Từ ngày <strong>{dateStart}</strong> - Đến ngày <strong>{dateEnd}</strong>
                </p>
                <Title level={3}>Tổng tiền: {amount}đ</Title>
                {status === 0 && (
                    <div className='bill-item__action'>
                        <Button
                            size='large'
                            type='primary'
                            onClick={() => navigate(`/bill/edit/${id}`)}
                        >
                            Sửa thông tin
                        </Button>
                        <Popconfirm
                            title='Bạn thực sự muốn hủy đơn？'
                            okText='Đồng ý'
                            cancelText='Không'
                            onConfirm={() => onCancel(id)}
                        >
                            <Button size='large'>Hủy đơn</Button>
                        </Popconfirm>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(BillItem);
