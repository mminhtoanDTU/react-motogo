import { Space, Typography } from 'antd';
import React, { memo } from 'react';
import { Popup } from 'react-map-gl';
import { CarOutlined } from '@ant-design/icons';
import './popupdistance.scss';

function converMeterToKm(meter) {
    return (meter / 1000).toFixed(1);
}

function convertSecondsToMinutes(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    return `${minutes} phút, ${seconds} giây`;
}

function PopupDistance({ longitude, latitude, distance, duration }) {
    return (
        <Popup
            tipSize={5}
            anchor='top'
            longitude={longitude}
            latitude={latitude}
            closeOnClick={true}
        >
            <Space align='start'>
                <CarOutlined style={{ fontSize: '20px' }} />
                <div>
                    <Typography.Title level={5}>{converMeterToKm(distance)} km</Typography.Title>
                    <Typography.Text>{convertSecondsToMinutes(duration)}</Typography.Text>
                </div>
            </Space>
        </Popup>
    );
}

export default memo(PopupDistance);
