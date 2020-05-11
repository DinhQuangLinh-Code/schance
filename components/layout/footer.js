import { Row, Col } from 'antd'
import Link from 'next/link'

const Footer = lang => (
    <footer className='footer-section footer-v4'>
        <div className='container-page'>
            <div className='copyright'>
                <Row gutter={20}>
                    <Col sm={24} md={12}>
                        <div className='copyright-text'>
                            <p>
                                {lang.footer.copyRight}
                                <Link href='/'>
                                    <a href='https://www.facebook.com/schance.group' target='_blank'>{lang.footer.copyRightCompany}</a>
                                </Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </footer>
)

export default Footer
