import React from 'react'
import './titleSection.scss';
import { Typography } from 'antd'

const { Title } = Typography;

function TitleSection({ content, type }) {

    let classes = `s-title ${type === 'light' ? 's-title-white' : type === 'primary' ? 's-title-primary' : ''}`


    return (
        <Title level={2} className={classes}>
            {content}
        </Title>
    )
}

export default TitleSection
