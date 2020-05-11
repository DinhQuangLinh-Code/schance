import { Affix, Row, Col } from 'antd'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Login from './login'
import { useState, useEffect } from 'react'
import userService from '../../services/user-service'
import Menu from './menu'
const logo = 'static/logo.png'

const Header = lang => {
    const [state, setState] = useState({
        dataCart: []
    })

    useEffect(() => {
        if (process.browser) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            setState(s => ({
                ...s,
                dataCart: cart
            }))
        }

        async function fetchData() {
            if(localStorage.token) {
                try {
                    await userService.getUserFront()
                } catch (error) {
                    if (error.response.status === 401) {
                        localStorage.removeItem('auth')
                        localStorage.removeItem('token')
                        location.reload()
                        location.reload()
                    }
                }
            }
        }

        fetchData()
    }, [])
    // Get state from Redux
    const cart = useSelector(state => state.cart)

    const showTotalAmount = cart => {
        var result = 0
        if (cart.length > 0) {
            for (var i = 0; i < cart.length; i++) {
                result += cart[i].quantity
            }
        }
        return result
    }
    var quantity = showTotalAmount(cart.data)
    return (
        <Affix offsetTop={0}>
            <div className='box_logo'>
                <div className='container-fluid'>
                    <Row className='text-center'>
                        <Col span={24}>
                            <div className='header container-the'>
                                <div className='header-left'>
                                    <Link href='/'>
                                        <a>
                                            <img src={logo} alt={logo} style={{ width: 200 }} />
                                        </a>
                                    </Link>
                                </div>
                                <Menu lang={lang} />
                                <div className='header-right'>
                                    <Login lang={lang} />
                                    <Link href='/gio-hang'>
                                        <a className='bgr-cart'>
                                            <div className='br-card'>
                                                <i
                                                    className='fa fa-shopping-cart'
                                                    aria-hidden='true'></i>
                                                <p className='text-cart'>{lang.cart.cart}</p>
                                                    <span className='cart-count'>{quantity}</span>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Affix>
    )
}

export default Header
