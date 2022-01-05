import { Image } from 'antd';
import React from 'react';

function ImagePreview({ value, onChange }) {
    console.log(value);
    return (
        <div>
            <Image src={value} />
        </div>
    );
}

export default ImagePreview;
