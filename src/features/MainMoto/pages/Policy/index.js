import { Tabs, Typography } from 'antd';
import React from 'react';
import { Footer } from '../../../../components';
import './policy.scss';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

function PolicyPage() {
    return (
        <div className='policy'>
            <div className='policy__banner'>
                <h1 className='policy__title'>CHÍNH SÁCH</h1>
            </div>
            <div className='container'>
                <Tabs defaultActiveKey='1' tabPosition={'left'} size='large'>
                    <TabPane tab='Thời gian thuê xe' key='1'>
                        <Title level={3}>Thời gian thuê xe</Title>
                        <Title level={5}>
                            - Giá thuê xe sẽ được tính kết hợp theo ngày và theo giờ
                        </Title>
                        <Paragraph>
                            <Text strong>01 ngày thuê</Text> sẽ là 24 tiếng, tính từ giờ, thời điểm
                            bạn nhận xe ngày hôm nay đến đúng giờ đó ngày hôm sau.
                        </Paragraph>
                        <Paragraph>
                            <Text strong>Giờ thuê xe</Text> chỉ được áp dụng khi bạn thuê xe {'>'} 1
                            ngày. Giá theo giờ phát sinh sẽ tùy thuộc vào loại xe bạn thuê:
                        </Paragraph>
                        <table className='policy__table'>
                            <tr>
                                <th>Xe số</th>
                                <td>10k/tiếng phát sinh</td>
                            </tr>
                            <tr>
                                <th>Xe tay ga</th>
                                <td>20k/tiếng phát sinh</td>
                            </tr>
                        </table>
                        <Paragraph>
                            <Text italic strong>
                                Lưu ý:
                            </Text>{' '}
                            Nếu số giờ phát sinh của bạn {'>'} 9 tiếng, MOTOGO sẽ tính tròn là 1
                            ngày thuê xe.
                        </Paragraph>
                        <Paragraph>Ví dụ: Bạn thuê một xe số Sirius,</Paragraph>
                        <Paragraph>
                            <Text strong>Nhận xe:</Text> 9h sáng, 21/08/2012<br></br>
                            <Text strong>Trả xe lúc:</Text> 3h chiều, 22/08/2012
                        </Paragraph>
                        <Paragraph>
                            Hệ thống của chúng tôi sẽ tính toán như sau: Tổng thời gian bạn thuê xe
                            sẽ là 1 ngày và 6 tiếng, bạn sẽ thay toán cho tổng thời gian thuê xe đó
                            bao gồm giá thuê xe 1 ngày và giá thuê xe 06 tiếng phát sinh còn lại còn
                            lại = 180k.
                        </Paragraph>
                        <Title level={5}>
                            - Ngày đầu tiên thuê xe, bạn thuê một vài tiếng thì vẫn phải trả tiền
                            thuê xe tròn 1 ngày.
                        </Title>
                        <Paragraph>
                            Ví dụ: <Text strong>Thời gian lấy xe của bạn là </Text>9h sáng,
                            21/08/2012, Thời gian trả xe của bạn là 3h chiều cùng ngày thì HỆ THÔ
                            chúng tôi sẽ tính thời gian thuê xe là 1 ngày.
                        </Paragraph>
                        <Title level={5}>
                            - Đi quá 30 phút mới làm tròn thành 1 tiếng phát sinh.
                        </Title>
                    </TabPane>
                    <TabPane tab='Thủ tục thuê xe' key='2'>
                        <Title level={3}>Thủ tục thuê xe</Title>
                        <Paragraph>Các bước làm thủ tục thuê xe như sau:</Paragraph>
                        <Paragraph>
                            <Text strong>1–</Text> Khách thuê xe phải là người trong độ tuổi được
                            phép lái xe và có Giấy phép lái xe được cấp bởi cơ quan nhà nước có thẩm
                            quyền.
                        </Paragraph>
                        <Paragraph>
                            <Text strong>2–</Text> Phải để lại các giấy tờ sau trong các giấy tờ
                            sau:
                            <Paragraph>
                                Đối với khách du lịch đi bằng máy bay vui lòng để lại{' '}
                                <Text strong>CMND, thẻ Căn cước Công dân</Text> hoặc{' '}
                                <Text strong>Hộ chiếu</Text> kèm với{' '}
                                <Text strong>thông tin chuyến bay đến và rời.</Text>
                            </Paragraph>
                            <Paragraph>
                                Với khách là người địa phương hoặc từ nơi khác đến không có vé máy
                                bay, thủ tục yêu cầu là để lại
                                <Text strong> CMND, thẻ Căn cước Công dân</Text> hoặc
                                <Text strong> Hộ chiếu kèm Sổ hộ khẩu</Text> (nếu không có sổ hộ
                                khẩu sẽ thay thế bằng <Text strong>tiền đặt cọc 3 triệu đồng</Text>)
                            </Paragraph>
                        </Paragraph>
                        <Paragraph>
                            <Text strong>3–</Text> Đồng ý các điều khoản và ký vào hợp đồng thuê xe
                            giữa 2 bên.
                        </Paragraph>
                        <Paragraph>
                            <Text strong>4–</Text> Nhận xe
                        </Paragraph>
                    </TabPane>
                    <TabPane tab='Giá thuê xe' key='3'>
                        <Title level={3}>Giá thuê xe</Title>
                        <Paragraph>
                            Giá cho thuê xe máy tại các tỉnh thành phố sẽ khác nhau do mỗi nơi có
                            những điều kiện địa hình khác nhau, ảnh hưởng đến chất lượng xe khác
                            nhau. Mỗi thị trường sẽ có bảng giá, đơn giá theo ngày khác nhau, tuy
                            nhiên cách tính về khung thời gian, chính sách áp dụng chung không thay
                            đổi.
                        </Paragraph>
                        <Paragraph>
                            Giá cho thuê xe sẽ phụ thộc vào loại xe bạn thuê và được công khai trên
                            website. Chúng tôi cam kết sẽ không tăng giá thuê xe khi khách hàng đang
                            sử dụng dịch vụ của chúng tôi.
                        </Paragraph>
                        <Paragraph>
                            Giá trị hợp đồng thuê xe sẽ được tính dựa trên thời gian thuê xe của
                            khách và giá thuê xe tính theo đơn vị ngày, giờ đối với từng loại xe.
                        </Paragraph>
                    </TabPane>
                    <TabPane tab='Trách nhiệm bên thuê' key='4'>
                        <Title level={3}>Trách nhiệm bên thuê</Title>
                        <Paragraph>
                            Người thuê xe sẽ phải tự đổ nhiên liệu cho xe để di chuyển.
                        </Paragraph>
                        <Paragraph>
                            Kiểm tra kỹ xe trước khi nhận và tự đổ nhiên liệu để lưu thông xe trên
                            đường.
                        </Paragraph>
                        <Paragraph>
                            Không được bóc hay làm rách tem bảo hành và đảm bảo sửa chữa, thay thế
                            bất cứ chi tiết nào.
                        </Paragraph>
                        <Paragraph>
                            Trong thời gian sử dụng xe thuê, bên B phải có trách nghiệm bảo vệ, giữ
                            dìn và điều khiển xe tuân thủ đúng với luật oan toàn giao thông Việt
                            Nam. Trường hợp xẩy ra vấn đề phát sinh sẽ được giải quyết như dưới đây:
                        </Paragraph>
                        <ul className='policy__list'>
                            <li>
                                Bên B phải báo lại cho bên A khi có các vấn đề hỏng hóc xẩy ra để
                                hai bên thống nhất phương án thực hiện.
                            </li>
                            <li>
                                Mọi sự cố bẹp, nứt, vỡ, móp méo các chi tiết của xe do người thuê
                                gây ra thì người thuê phải mua đồ của hãng thay thế (không chấp nhận
                                gò, hàn).
                            </li>
                            <li>
                                Đối với việc thủng săm, thủng lốp khi lưu thông trên đường, khách
                                thuê xe sẽ phải tự khắc phục và trả khoản phí vá săm hoặc thay thế.
                            </li>
                            <li>
                                Các vết xước, bẹp nhẹ không phải thay đồ mới thì người thuê phải bồi
                                thường cho cho thuê số tiền theo báo giá thị trường.
                            </li>
                            <li>
                                Các ngày xe nghỉ không chạy được do lỗi của bên thuê, thì bạn vẫn
                                phải trả tiền cho các ngày đó như đang thuê xe để sử dụng.
                            </li>
                            <li>
                                Trường hợp người thuê xe vi phạm an toàn giao thông dẫn tới xe bị
                                giữ thì người thuê xe phải có tránh nhiệm đóng toàn bộ tiền các lỗi
                                vi phạm và thời gian giữ xe vẫn tính là ngày cho thuê xe. Mọi chi
                                phí đi lại, ăn ở, vvv…của bên cho thuê để giải quyết việc do bên
                                thuê gây ra, bên thuê phải chịu hoàn toàn trách nhiệm chi trả.
                            </li>
                            <li>
                                Trong thời gian thuê xe người thuê làm mất xe, gây tai nạn nghiêm
                                trọng dẫn đến xe bị phá hủy hoàn toàn thì người thuê phải chịu trách
                                nhiệm đền tiền, giá trị tương đương với giá trị xe được định giá tại
                                thời điểm cho thuê xe.
                            </li>
                        </ul>
                        <Paragraph>
                            Đối với khách đi dài, cứ sau 30 ngày bên B phải mang xe về để bên A kiểm
                            tra và bảo dưỡng xe định kỳ 1 lần.
                        </Paragraph>
                        <Paragraph>
                            Bên thuê phải có trách nhiệm trả xe đúng hạn như đã thống nhất trên hợp
                            đồng. Trường hợp bên thuê muốn gia hạn thêm thời gian sử dụng thì phải
                            liên hệ báo trước cho bên A, và khoản phát sinh thuê thêm sẽ vẫn được
                            tính dựa trên bảng giá dịch vụ của bên A.
                        </Paragraph>
                    </TabPane>
                    <TabPane tab='Trách nhiệm bên cho thuê' key='5'>
                        <Title level={3}>Trách nhiệm bên cho thuê</Title>
                        <Paragraph>
                            Bên cho thuê phải đảm bảo xe cho thuê có đầy đủ điều kiện an toàn lưu
                            thông trên đường, đúng như cam kết thỏa thuận với khách hàng. Với mỗi xe
                            cho thuê chỉ đi kèm 02 mũ bảo hiểm theo tiêu chuẩn.
                        </Paragraph>
                        <Paragraph>
                            Cung cấp các giấy tờ sau cho người thuê xe: Bản photo giấy đăng ký xe,
                            Bảo hiểm trách nhiệm dân sự xe. Có trách nhiêm giúp đỡ, hỗ trợ, hướng
                            dẫn người thuê trong các tình huống cần có sự xuất hiện của chủ xe.
                        </Paragraph>
                        <Title level={3}>Đổi trả, chấm dứt hợp đồng</Title>
                        <Paragraph>
                            Trường hợp dịch vụ cung cấp không đúng như cam kết giữa 2 bên, khách
                            hàng có quyền từ chối sử dụng dịch vụ hoặc yêu cầu thay thế xe bằng loại
                            xe khác đúng như yêu cầu. Bên cho thuê xe phải có trách nhiệm gửi trả
                            lại toàn bộ tiền đặt cọc cho khách nếu khách từ chối sử dụng dịch vụ
                            trong trường hợp này.
                        </Paragraph>
                        <Paragraph>
                            Trường hợp khách hàng kết thúc hợp đồng thuê xe máy sớm hơn thời gian
                            thống nhất ghi trong hợp đồng, bên cho thuê chấp nhận thời điểm trả xe
                            là thời điểm kết thúc hợp đồng và giá trị hợp đồng được tính đến thời
                            điểm đó. Tiền thừa sẽ được hoàn trả lại khách.
                        </Paragraph>
                        <Paragraph>
                            Đối với khách đã đặt lịch thuê xe, khách hàng có thể hủy bỏ lịch đặt xe
                            bất kỳ lúc nào mà không phải chịu khoản chi phí kèm theo.
                        </Paragraph>
                    </TabPane>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
}

export default PolicyPage;
