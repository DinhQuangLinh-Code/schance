import { Fragment } from 'react'
import Head from 'next/head'
import PayMentCotainer from '../components/container/payment/payment-container'

const PayMent = props => {
    const { lang } = props

    return (
        <Fragment>
            <Head>
                <title>Schance - Thanh toán</title>
            </Head>
            <PayMentCotainer lang={lang} />
        </Fragment>
    )
}
export default PayMent
