import { Col, Row, Select, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosClient from '../../../../axiosClient';
import Mapbox from '../../components/Mapbox';
import SearchItem from '../../components/SearchItem';
import { branchInfoSelector, setBranchInfo, setSearchInfo, setVehicleInfo } from '../../motoSlice';
import './search.scss';

const { Title, Text } = Typography;
const { Option } = Select;

function SearchPage() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState([]);
    const LocateQuery = searchParams.get('locate') || 'dn';
    const branchInfo = useSelector(branchInfoSelector);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCurrentVehicle() {
            setIsLoading(true);
            const vehicles = await axiosClient.get(
                `/vehicles?branchId=${branchInfo.id}&_sort=status`
            );

            setVehicles(vehicles.data);
            setIsLoading(false);
        }

        getCurrentVehicle();
    }, [branchInfo]);

    const handleOnRent = (currentVehicle) => {
        dispatch(setVehicleInfo(currentVehicle));
        navigate(`/order`);
    };

    const handleSearchChange = (value) => {
        dispatch(setSearchInfo({ location: value }));
        dispatch(setBranchInfo({}));
        navigate(`/search?location=${value}`);
    };

    return (
        <section className='search'>
            <div className='search__container'>
                <Row className='search__row'>
                    <Col className='search__left' xs={8}>
                        {Object.keys(branchInfo).length === 1 ? (
                            <p className='search__text t-center'>
                                Đã tìm thấy {branchInfo.countBranches} chi nhánh của MOTOGO ở khu
                                vực bạn chon. Nhấn vào logo trên bản đồ để xem chi tiết.
                            </p>
                        ) : (
                            <Spin spinning={isLoading}>
                                <div className='search__info'>
                                    <Title level={3}>{branchInfo.name}</Title>
                                    <p>
                                        <Text strong>Địa chỉ: </Text>
                                        <Text>{branchInfo.address}</Text>
                                    </p>
                                    <p>
                                        <Text strong>Số diện thoại: </Text>
                                        <Text>{branchInfo.tel}</Text>
                                    </p>
                                    <Title level={4}>Danh sách xe máy</Title>
                                    <div className='search__list'>
                                        {vehicles.map((vehicle) => (
                                            <SearchItem
                                                key={vehicle.id}
                                                data={vehicle}
                                                onRent={handleOnRent}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Spin>
                        )}
                    </Col>
                    <Col className='search__right' xs={16}>
                        <Select
                            showSearch
                            className='search__searchbox'
                            placeholder='Chọn vị trí'
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            defaultValue={LocateQuery}
                            onChange={handleSearchChange}
                        >
                            <Option value='dn'>Đà Nẵng</Option>
                            <Option value='ha'>Hội An</Option>
                            {/* <Option value='py'>Phú Yên</Option>
                            <Option value='dl'>Đà Lạt</Option> */}
                        </Select>
                        <Mapbox query={LocateQuery} />
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default SearchPage;
