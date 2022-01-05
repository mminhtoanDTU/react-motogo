import {
    CheckCircleFilled,
    ClockCircleOutlined,
    DollarOutlined,
    LikeOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Image, Row, Select } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HeroBg from '../../../../assets/images/MOTOGO-hero-bg.jpg';
import { Footer, TitleSection } from '../../../../components';
import { setSearchInfo } from '../../motoSlice';
import './home.scss';

const { Option } = Select;

function Home() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const onFinish = (values) => {
        let formData = values;
        if (values['dateStart']) {
            formData.dateStart = values['dateStart'].format('DD-MM-YYYY');
        }
        if (values['dateEnd']) {
            formData.dateEnd = values['dateEnd'].format('DD-MM-YYYY');
        }

        dispatch(setSearchInfo(formData));

        navigate(`/search?location=${values['location']}`);
    };

    return (
        <>
            <section className='hero' style={{ backgroundImage: `url(${HeroBg})` }}>
                <div className='container hero__container'>
                    <Row className='hero__row' gutter={[16, 16]}>
                        <Col className='hero__left' xs={24} md={12} lg={14} xl={14}>
                            <h1 className='hero__left-title'>Dịch vụ thuê xe máy</h1>
                            <p className='hero__left-desc'>
                                Chúng tôi hiểu cảm giác của người đi thuê xe máy phải bỏ ra một số
                                tiền để có được một chiếc xe đủ tốt, không gặp rắc rối khi đi trên
                                đường. Tuy nhiên thật khó để tìm được một đơn vị cung cấp dịch vụ
                                cho thuê xe uy tín, chất lượng hiện nay. MOTOGO - tiên phong trở
                                thành thành đơn vị số 1 về cung cấp dịch vụ thuê xe máy tự lái tại
                                Việt Nam.
                            </p>
                        </Col>
                        <Col className='hero__right' xs={24} md={12} lg={10} xl={10}>
                            <Form
                                name='search'
                                className='hero__form'
                                layout='vertical'
                                onFinish={onFinish}
                            >
                                {/* <Title level={3} className="hero__form-title">Đặt lịch ngay</Title> */}
                                <Form.Item
                                    name='location'
                                    label='Chọn địa điểm'
                                    rules={[
                                        {
                                            type: 'string',
                                            required: true,
                                            message: 'Please select location!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder='Search to Select'
                                        optionFilterProp='children'
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children
                                                .toLowerCase()
                                                .localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        <Option value='dn'>Đà Nẵng</Option>
                                        <Option value='ha'>Hội An</Option>
                                        {/* <Option value='py'>Phú Yên</Option>
                                        <Option value='dl'>Đà Lạt</Option> */}
                                    </Select>
                                </Form.Item>
                                <Form.Item name='dateStart' label='Ngày nhận xe'>
                                    <DatePicker
                                        className='w-full'
                                        format='DD-MM-YYYY'
                                        disabledDate={(current) =>
                                            current && current < moment().startOf('day')
                                        }
                                    />
                                </Form.Item>
                                <Form.Item name='dateEnd' label='Ngày trả xe'>
                                    <DatePicker
                                        className='w-full'
                                        format='DD-MM-YYYY'
                                        disabledDate={(current) =>
                                            current && current < moment().startOf('day')
                                        }
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        block='true'
                                        size='large'
                                    >
                                        Tìm kiếm
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className='suggest'>
                <div className='container suggest__container'>
                    <TitleSection content='DANH MỤC XE MÁY' type='primary' />
                    <p className='suggest__desc'>
                        Toàn bộ xe máy cho thuê của chúng tôi là xe được mua mới 100%, được đăng ký
                        chính chủ. Ngoài ra, các xe sau khi kết thúc hợp đồng với khách sẽ được kiểm
                        tra, bảo dưỡng, thay thế các bộ phận hỏng hóc và phải đạt chuẩn an toàn xe
                        trước khi giao cho khách hàng mới.
                    </p>
                    <div className='suggest__list'>
                        <div className='suggest__item'>
                            <h2 className='suggest__item-title'>Yamaha Sirius 110cc</h2>
                            <p className='suggest__item-price'>
                                <span>120</span>.000/ Ngày
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> 2 mũ bảo hiểm 1/2 đầu
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> 2 áo mưa tiện lợi
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> Bảo hiểm + Đăng ký xe photo
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> Dịch vụ cứu hộ
                            </p>
                            <Image
                                src='https://yamahaanphu.com/timthumb.php?src=upload/images/yamaha-sirius-rc-2019-2020.png&w=470&h=0&zc=1&a=tc'
                                preview={false}
                            />
                            <Button className='suggest__item-btn'>
                                <Link to='search'>Đặt xe ngay</Link>
                            </Button>
                        </div>
                        <div className='suggest__item'>
                            <h2 className='suggest__item-title'>Honda AirBlade 125</h2>
                            <p className='suggest__item-price'>
                                <span>200</span>.000/ Ngày
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> 2 mũ bảo hiểm 1/2 đầu
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> 2 áo mưa tiện lợi
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> Bảo hiểm + Đăng ký xe photo
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> Dịch vụ cứu hộ
                            </p>
                            <Image
                                src='https://cdn.honda.com.vn/motorbike-versions/December2020/jbtAgSOxPcIZsbDmk3i8.png'
                                preview={false}
                            />
                            <Button className='suggest__item-btn'>
                                <Link to='search'>Đặt xe ngay</Link>
                            </Button>
                        </div>
                        <div className='suggest__item'>
                            <h2 className='suggest__item-title'>Honda FUTURE 125</h2>
                            <p className='suggest__item-price'>
                                <span>120</span>.000/ Ngày
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> 2 mũ bảo hiểm 1/2 đầu
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> 2 áo mưa tiện lợi
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> Bảo hiểm + Đăng ký xe photo
                            </p>
                            <p className='suggest__item-text'>
                                <CheckCircleFilled /> Dịch vụ cứu hộ
                            </p>
                            <Image
                                src='https://i.ndh.vn/2018/04/27/e72thu-vien-anh-800x525-1-1524797315.png'
                                preview={false}
                            />
                            <Button className='suggest__item-btn'>
                                <Link to='search'>Đặt xe ngay</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='benefit'>
                <div className='container'>
                    <div className='benefit__container'>
                        <div className='benefit__item'>
                            <span className='benefit__item-icon'>
                                <LikeOutlined />
                            </span>
                            <h3 className='benefit__item-title'>KHÔNG TIỀN ĐẶT CỌC</h3>
                            <p className='benefit__item-text'>
                                Khách hàng không phải đặt cọc bất cứ khoản tiền cho việc thuê xe máy
                                nào nếu có đầy đủ các giấy tờ yêu cầu được quy định trong chính sách
                                của cty. Chi tiết thủ tục giấy tờ vui lòng xem tại mục chính sách
                                thuê xe của chúng tôi.
                            </p>
                        </div>
                        <div className='benefit__item'>
                            <span className='benefit__item-icon'>
                                <ClockCircleOutlined />
                            </span>
                            <h3 className='benefit__item-title'>1 NGÀY THUÊ = 24H</h3>
                            <p className='benefit__item-text'>
                                Không giống như các đơn vị cho thuê xe khác, ngày thuê xe được tính
                                từ sáng đến chiều, vậy với cùng khoảng thời gian thuê xe 24h bạn
                                luôn phải trả nhiều tiền hơn so với việc thuê xe của MOTOGO. Cách
                                tính 1 ngày thuê xe = 24h của chúng tôi cực kỳ có lợi cho người thuê
                                xe.
                            </p>
                        </div>
                        <div className='benefit__item'>
                            <span className='benefit__item-icon'>
                                <SmileOutlined />
                            </span>
                            <h3 className='benefit__item-title'>DỊCH VỤ GIAO, TRẢ XE TẬN NƠI</h3>
                            <p className='benefit__item-text'>
                                Chúng tôi cung cấp dich vụ giao xe tận nơi cho bạn với một khoản phí
                                phát sinh thấp. Chi phí giao xe sẽ được tính toán theo địa điểm giao
                                nhận xe của khách và phí mỗi lần không vượt quá 40k.
                            </p>
                        </div>
                        <div className='benefit__item'>
                            <span className='benefit__item-icon'>
                                <DollarOutlined />
                            </span>
                            <h3 className='benefit__item-title'>
                                ĐI BAO NHIÊU THANH TOÁN BẤY NHIÊU
                            </h3>
                            <p className='benefit__item-text'>
                                Từ ngày thuê xe thứ 2 trở đi cách tính giá thuê xe theo giờ sẽ được
                                áp dụng, với mỗi giờ phát sinh của xe số chúng tôi sẽ thu thêm 10k,
                                xe tay ga là 20k. Thuê xe quá 9 tiếng sẽ được tính tròn 1 ngày thuê
                                xe. Trả xe sớm MOTOGO sẽ hoàn tiền thừa lại cho bạn
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='action'>
                <div className='container'>
                    <div className='action__container'>
                        <h1 className='action__title'>
                            THUÊ XE CỦA <span>MOTOGO</span> NGAY!
                        </h1>
                        <Link to='/search' className='action__btn'>
                            Bắt đầu tại đây
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;
