import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './admin.scss';
import { BranchPage, HomePage, OrderPage, UserPage, VehiclePage } from './pages';

const { Header, Content } = Layout;

function Admin() {
    return (
        <div>
            <Layout className='layout'>
                <Header>
                    <Menu
                        className='container'
                        theme='dark'
                        mode='horizontal'
                        defaultSelectedKeys={['home']}
                    >
                        <Menu.Item key='home'>
                            <Link to='.'>Home</Link>
                        </Menu.Item>

                        <Menu.Item key='order'>
                            <Link to='orders'>Orders</Link>
                        </Menu.Item>

                        <Menu.Item key='user'>
                            <Link to='users'>Users</Link>
                        </Menu.Item>
                        <Menu.Item key='vehicle'>
                            <Link to='vehicles'>Vehicles</Link>
                        </Menu.Item>
                        <Menu.Item key='branch'>
                            <Link to='branches'>Branch</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <div className='container admin__container'>
                        <Routes>
                            <Route index element={<HomePage />} />
                            <Route path='orders' element={<OrderPage />} />
                            <Route path='users' element={<UserPage />} />
                            <Route path='vehicles' element={<VehiclePage />} />
                            <Route path='branches' element={<BranchPage />} />
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default Admin;
