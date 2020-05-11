import { Fragment } from 'react'
import Head from 'next/head'
import CartContainer from '../components/container/cart/cart-container'
const CartPage = lang => {
    return (
        <Fragment>
            <Head>
                <title>Schance - Giỏ hàng</title>
            </Head>
            <CartContainer lang={lang} />
        </Fragment>
    )
}
export default CartPage
