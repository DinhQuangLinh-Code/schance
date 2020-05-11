import { Row, Col } from 'antd'
import Link from 'next/link'

const ProductHeader = props => {
    const { lang } = props
    return (
        <div>
            <Row gutter={20}>
                <Col xs={24} sm={16} md={16}>
                    <div className='title-page-custom3'>
                      <h2>{lang.product.title}</h2>
                        <Link href='/san-pham'>
                            <a>
                                <h3 className='all-product'>
                                    {lang.product.listProduct}
                                </h3>
                            </a>
                        </Link>
                        <p>
                            {lang.product.text1}
                            {lang.product.text2}
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductHeader
