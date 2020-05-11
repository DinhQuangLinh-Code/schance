import { Row, Col, Radio } from 'antd'

const PaymentOrder = props => {
    const { lang, onChange, value, address, dataCart, order } = props
    const showTotalNumber = cart => {
        var result = 0
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                result += cart[i].quantity
            }
        }
        return result
    }

    const showTotalAmount = cart => {
        var total = 0
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].cart.promotePrice) {
                    total += cart[i].cart.promotePrice * cart[i].quantity
                } else {
                    total += cart[i].cart.price * cart[i].quantity
                }
            }
        }
        return total
    }

    const showDonate = item => {
        var donate = 0
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                if (item[i].cart.promotePrice) {
                    donate +=
                    item[i].cart.promotePrice *
                    item[i].quantity *
                    (item[i].cart.donateRate ? item[i].cart.donateRate / 100 : 0)
                } else {
                    donate +=
                    item[i].cart.price *
                    item[i].quantity *
                    (item[i].cart.donateRate ? item[i].cart.donateRate / 100 : 0)
                }
            }
        }
        return donate
    }

    var totalMoney = showTotalAmount(dataCart)
    var totalNumber = showTotalNumber(dataCart)
    var donate = showDonate(dataCart)

    const listCart = !dataCart
        ? null
        : dataCart.map((item, index) => {
              var total = 0
              if (item.cart.promotePrice) {
                    total += item.cart.promotePrice * item.quantity
              } else {
                    total += item.cart.price * item.quantity
              }
              return (
                  <div className='item' key={index}>
                      <p className='title'>
                          <strong>{item.quantity}x </strong>
                          {item.cart.name}
                          <span className='seller-by'><br />
                              {lang.payment.provided}
                              <strong className='firm'>{item.cart.company.name}</strong>
                          </span>
                      </p>
                      <p className='price text-right'>
                          <span>
                              {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0
                              }).format(total) + ' ₫'}
                          </span>
                      </p>
                  </div>
              )
          })

    return (
        <Row gutter={10} style={{margin: 0}}>
            <h3>{lang.payment.textStep3}</h3>
            <Col md={16} style={{paddingLeft: 0}}>
                <div className='box-checkout'>
                    <div className='panel-body'>
                        <Radio.Group onChange={onChange} value={order ? order.payment : value}>
                            <div className='checkout-item'>
                                <Radio value={1}>{lang.payment.payMent}</Radio>
                            </div>
                            <div className='checkout-item'>
                                <Radio value={2}>{lang.payment.payMentATM}</Radio>
                            </div>
                        </Radio.Group>
                    </div>
                    {(order ? order.payment === 2 : value === 2) && (
                        <div className='panel-body information-order text-style'>
                            <h4>{lang.ATMinformation.transferinfo}</h4>
                            <p><span>{lang.ATMinformation.stk}</span>{lang.ATMinformation.accountNumber}</p>
                            <p><span>{lang.ATMinformation.owner}</span>{lang.ATMinformation.accountName}</p>
                            <p><span>{lang.ATMinformation.bank}</span>{lang.ATMinformation.bankName}</p>
                            {order ? <p><span>{lang.ATMinformation.transfer_content}</span>{order.orderNo}</p> : null}
                        </div>
                    )}
                </div>
            </Col>
            <Col md={8} style={{paddingRight: 0}}>
                <div className='box-checkout'>
                    <div className='panel-body'>
                        <div className='order'>
                            <span className='title'>{lang.payment.customer}</span>
                        </div>
                        <div className='information'>
                            <h6>{address ? address.userName : ''}</h6>
                            <p className='end'>
                                {address ? address.address : ''}
                                <br />
                                {lang.payment.vn}
                                <br />
                                {lang.payment.phone}: {address ? address.phone : ''}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='box-checkout'>
                    <div className='panel-body'>
                        <div className='order'>
                            <span className='title'>
                                {lang.payment.order}: ({totalNumber}&nbsp;
                                {lang.payment.product} )
                            </span>
                        </div>
                        <div className='product'>{listCart}</div>
                        <p className='list-info-price'>
                            <b>{lang.cart.provisional}:</b>
                            <span>
                                {new Intl.NumberFormat('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(totalMoney) + ' ₫'}
                            </span>
                        </p>
                        <p className='list-info-price'>
                            <b>{lang.cart.intoMoney}:</b>
                            <span>
                                {new Intl.NumberFormat('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(totalMoney) + ' ₫'}{' '}
                            </span>
                        </p>
                        <p className='text-right'>
                            <i>({lang.cart.vat})</i>
                        </p>
                        <p className='list-info-price'>
                            <b>{lang.cart.supported}:</b>
                            <span>
                                {new Intl.NumberFormat('en-GB', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(donate) + ' ₫'}{' '}
                            </span>
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default PaymentOrder
