import { Button, Badge, Select } from 'antd';
import React, { memo } from 'react';
import './searchitem.scss';

const { Option } = Select;

function SearchItem({ data, onRent }) {
    const { name, photoUrl, price, status } = data;

    return (
        <Badge.Ribbon
            text={status === 0 ? 'Còn' : 'Đã thuê'}
            color={status === 0 ? 'green' : 'red'}
        >
            <div className='search-item'>
                <img src={photoUrl} alt='xe' className='search-item__image' />
                <div className='search-item__info'>
                    <h3 className='search-item__name'>{name}</h3>
                    <Select defaultValue={`1 ngày - ${price[0]}/ngày`} style={{ width: '100%' }}>
                        {/* <Option value="lucy">Lucy</Option> */}
                        {price.map((item, index) => (
                            <Option key={index} value={index}>{`${
                                index + 1
                            } ngày - ${item}/ngày`}</Option>
                        ))}
                        <Option value={4}>+5 ngày - {price[3]}/ngày</Option>
                    </Select>

                    <div className='search-item__action'>
                        <Button type='default'>Xem chi tiết</Button>
                        <Button
                            type='primary'
                            disabled={status === 0 ? false : true}
                            onClick={() => onRent(data)}
                        >
                            Thuê ngay
                        </Button>
                    </div>
                </div>
            </div>
        </Badge.Ribbon>
    );
}

export default memo(SearchItem);
