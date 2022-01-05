import { Empty, Spin, Tabs, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../../../../axiosClient';
import { userInfoSelector } from '../../../Auth/authSlice';
import BillItem from '../../components/BillItem';
import './bill.scss';

const { TabPane } = Tabs;
const { Title } = Typography;

function Bill() {
    const [billList, setBillList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [tab, setTab] = useState('all');
    const userInfo = useSelector(userInfoSelector);

    const handleTabsChange = (active) => {
        setTab(active);
    };

    useEffect(() => {
        setIsLoading(true);
        async function fetchBill() {
            let url = `/orders?userId=${userInfo.id}&_expand=vehicle&_expand=branch&_sort=createdAt&_order=desc`;
            if (tab === 'pendding') {
                url += '&status=0';
            } else if (tab === 'success') {
                url += '&status=1';
            } else if (tab === 'completed') {
                url += '&status=2';
            } else if (tab === 'cancel') {
                url += '&status=-1';
            }
            const res = await axiosClient.get(url);
            setBillList(res.data);
            setIsLoading(false);
        }

        fetchBill();
    }, [tab, userInfo, isChanged]);

    const handleCancelStatusBill = useCallback(
        async (billId) => {
            await axiosClient.patch(`/orders/${billId}`, { status: -1 });
            setIsChanged(!isChanged);
        },
        [isChanged]
    );

    return (
        <section className='bill'>
            <div className='container bill__container'>
                <Title level={2}>Thông tin đơn hàng</Title>
                <Tabs defaultActiveKey='1' onChange={handleTabsChange} size='large'>
                    <TabPane tab='Tất cả' key='all'>
                        <Spin spinning={isLoading} tip='Loading...'>
                            {billList.length === 0 ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                billList.map((bill) => (
                                    <BillItem
                                        key={bill.id}
                                        data={bill}
                                        onCancel={handleCancelStatusBill}
                                    />
                                ))
                            )}
                        </Spin>
                    </TabPane>
                    <TabPane tab='Đang chờ' key='pendding'>
                        <Spin spinning={isLoading} tip='Loading...'>
                            {billList.length === 0 ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                billList.map((bill) => (
                                    <BillItem
                                        key={bill.id}
                                        data={bill}
                                        onCancel={handleCancelStatusBill}
                                    />
                                ))
                            )}
                        </Spin>
                    </TabPane>
                    <TabPane tab='Đã duyệt' key='success'>
                        <Spin spinning={isLoading} tip='Loading...'>
                            {billList.length === 0 ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                billList.map((bill) => (
                                    <BillItem
                                        key={bill.id}
                                        data={bill}
                                        onCancel={handleCancelStatusBill}
                                    />
                                ))
                            )}
                        </Spin>
                    </TabPane>
                    <TabPane tab='Hoàn thành' key='completed'>
                        <Spin spinning={isLoading} tip='Loading...'>
                            {billList.length === 0 ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                billList.map((bill) => (
                                    <BillItem
                                        key={bill.id}
                                        data={bill}
                                        onCancel={handleCancelStatusBill}
                                    />
                                ))
                            )}
                        </Spin>
                    </TabPane>
                    <TabPane tab='Đơn hủy' key='cancel'>
                        <Spin spinning={isLoading} tip='Loading...'>
                            {billList.length === 0 ? (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            ) : (
                                billList.map((bill) => (
                                    <BillItem
                                        key={bill.id}
                                        data={bill}
                                        onCancel={handleCancelStatusBill}
                                    />
                                ))
                            )}
                        </Spin>
                    </TabPane>
                </Tabs>
            </div>
        </section>
    );
}

export default Bill;
