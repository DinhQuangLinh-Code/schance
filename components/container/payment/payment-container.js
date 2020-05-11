import { Fragment, useState } from 'react'
import PayMentStep from './payment-step'

export default props => {
    const { lang } = props

    return (
        <Fragment>
            <div className='payment-page'>
                <PayMentStep lang={lang} />
            </div>
        </Fragment>
    )
}
