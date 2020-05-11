import { Row, Col, Button } from 'antd'

const PaymentAddress = props => {
    const { onNextStep, onEditAddress, lang, address } = props
    return (
        <div className='panel-body-custom02'>
            <h5 className='address-have-before'>{lang.payment.addressBefore}</h5>
            <Row>
                <Col lg={12} md={12} sm={12} className='item'>
                    <div className='box-address-list'>
                        <p className='name'>{address ? address.userName : ''}</p>
                        <p className='address'>{address ? address.address : ''}</p>
                        <p className='address'>{lang.payment.vn}</p>
                        <p className='phone'>
                            {lang.payment.phone}: {address ? address.phone : ''}
                        </p>
                        <div className='action'>
                            <Button
                                className='ant-btn ant-btn-primary saving-address'
                                onClick={onNextStep}>
                                {lang.payment.buttonStep2}
                            </Button>
                            <Button className='btn-edit' onClick={onEditAddress}>
                                {lang.payment.buttonEdit}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PaymentAddress
