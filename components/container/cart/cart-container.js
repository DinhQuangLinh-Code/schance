import { Row, Col } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import CartItem from './cart-item'
import CartResult from './cart-result'
const bgImg = 'static/cart-images.png'

export default props => {
    const { lang } = props

    const cart = useSelector(state => state.cart)
    const dataSource = cart.data

    const dispatch = useDispatch()

    const onUpdateProductInCart = (type, payload) => {
        dispatch({ type: type, payload })
    }

    const onDeleteProductInCart = (type, payload) => {
        dispatch({ type: type, payload })
    }

    const showCartItem = (dataSource, lang, onDeleteProductInCart, onUpdateProductInCart) => {
        var result = (
            <div className='empty-cart'>
                <span className='image-cart' style={{ backgroundImage: `url(${bgImg})` }}></span>
                <p className='message'>{lang.lang.cart.noProduct}</p>
                <Link href='/'>
                    <a className='btn btn-yellow'>{lang.lang.cart.continueShopping}</a>
                </Link>
            </div>
        )
        if (dataSource.length > 0) {
            result = dataSource.map((v,key) => {
                return (
                    <CartItem
                        cart={v.cart}
                        quantity={v.quantity}
                        key={key}
                        lang={lang.lang}
                        onDeleteProductInCart={onDeleteProductInCart}
                        onUpdateProductInCart={onUpdateProductInCart}
                    />
                )
            })
        }
        return result
    }

    const showCartResult = (dataSource, lang) => {
        var result = null
        if (dataSource.length > 0) {
            result = <CartResult dataSource={dataSource} lang={lang.lang} />
        }
        return result
    }

    return (
        <div className='box-page'>
            <div className='container-the'>
                <Row gutter={20}>
                    <Col sm={24} xs={24} md={24} lg={18}>
                        <div className='checkout-shop-children'>
                            <div className='cart-item-product'>
                                {showCartItem(
                                    dataSource,
                                    lang,
                                    onDeleteProductInCart,
                                    onUpdateProductInCart
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col sm={24} xs={24} md={24} lg={6}>
                        {showCartResult(dataSource, lang)}
                    </Col>
                </Row>
            </div>
        </div>
    )
}
