import { Fragment } from 'react'
import Link from 'next/link'
import FacebookLogin from 'react-facebook-login'
import loginService from '../../../services/login-service'
import { setState } from 'expect/build/jestMatchersObject'
import Login from '../../layout/login'

const CartResult = props => {
    const { lang, dataSource } = props

    const showTotalAmount = item => {
        var total = 0
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                var price = item[i].cart.promotePrice
                    ? item[i].cart.promotePrice
                    : item[i].cart.price
                total += price * item[i].quantity
            }
        }
        return total
    }
    const confirmLogin = () =>{
        confirm(lang.payment.confirmLogin);
    }
   
    const showDonate = item => {
        var donate = 0
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                var price = item[i].cart.promotePrice
                    ? item[i].cart.promotePrice
                    : item[i].cart.price

                donate +=
                    price *
                    item[i].quantity *
                    (item[i].cart.donateRate ? item[i].cart.donateRate / 100 : 0)
            }
        }
        return donate
    }

    const totalMoney = showTotalAmount(dataSource)
    const donate = showDonate(dataSource, totalMoney)
      
    return (
        <Fragment>
            <div className='cart-item'>
                <div className='summary-section'>
                    <div className='summary-section-content'>
                        <div className='checkout-summary-rows'>
                            <div className='checkout-summarys'>
                                <div className='checkout-summary'>
                                    <div className='checkout-box'>
                                        <div className='checkout-summary-label'>
                                            {lang.cart.provisional}
                                        </div>
                                        <div className='checkout-summary-value'>
                                            <div className='checkout-summary-noline-value'>
                                                {new Intl.NumberFormat('en-GB', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(totalMoney) + ' ₫'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='checkout-summary'>
                                    <div className='checkout-box'>
                                        <div className='checkout-summary-label'>
                                            {lang.cart.intoMoney}:
                                        </div>
                                        <div className='checkout-summary-value'>
                                            <div className='checkout-summary-noline-value sle-payments'>
                                                {new Intl.NumberFormat('en-GB', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(totalMoney) + ' ₫'}
                                            </div>
                                            <p className='vat'>({lang.cart.vat})</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='checkout-summary'>
                                    <div className='checkout-box'>
                                        <div className='checkout-summary-label'>
                                            {lang.cart.supported}:
                                        </div>
                                        <div className='checkout-summary-value'>
                                            <div className='checkout-summary-noline-value'>
                                                {new Intl.NumberFormat('en-GB', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(donate) + ' ₫'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href='/thanh-toan'>
                <a className='bgr-cart'>
                    <button className='order-confirmation'>{lang.cart.order}</button>
                </a>
            </Link>
        </Fragment>
    )
}

export default CartResult
