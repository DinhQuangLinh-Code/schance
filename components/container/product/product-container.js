import { Fragment, useState, useEffect } from 'react'
import { Row, notification } from 'antd'
import { useDispatch } from 'react-redux'
import ProductHeader from './product-header'
import ProductItem from './product-item'
import storeAction from '../../../redux/actions'
import Link from 'next/link'

const noImage = 'static/no-image.jpg'

export default props => {
    const { companies, header, lang, products } = props

    const [state, setstate] = useState({
        dataSource: products ? products : ''
    })

    useEffect(() => {
        if (header === true) {
            setstate({
                dataSource: products.filter(x => x.isFirst === true)
            })
        }
    }, [])

    // declare dispatch for Redux update action
    const dispatch = useDispatch()

    const onAddToCart = (product, eId) => {
        let qtl = document.getElementById(eId).innerHTML
        let payload = {
            cart: product,
            quantity: parseInt(qtl)
        }
        dispatch({ type: storeAction.CART_ADD, payload })
        const args = {
            message: (
                <div className='add-to-cart'>
                    <p className='text'>
                        <i className='fas fa-check-circle'></i>
                        {lang.messege.addProduct}
                    </p>
                    <Link href='/gio-hang'>
                        <a className='btn btn-view-cart'>{lang.messege.seeCart}</a>
                    </Link>
                </div>
            ),
            duration: 2,
            top: 60,
            right: 20
        }
        notification.open(args)
    }

    const onIncreaseDecrease = e => {
        let text = e.target.innerHTML
        let currentQlt = parseInt(e.target.parentNode.childNodes[1].innerHTML)
        if (text === '-') {
            if (currentQlt - 1 > 0) {
                e.target.parentNode.childNodes[1].innerHTML = --currentQlt
            }
        } else {
            e.target.parentNode.childNodes[1].innerHTML = ++currentQlt
        }
    }

    return (
        <Fragment>
            <div className='container-page'>
                <div className='elementor-row box-product'>
                    {header && <ProductHeader lang={lang} companies={companies} />}
                    <Row gutter={20}>
                        {products.map(v => {
                            const company = props.companies.find(c => c._id === v.company.id)
                            return  <ProductItem
                                lang={lang}
                                product={v}
                                company={company}
                                key={v._id}
                                noImage={noImage}
                                onAddToCart={onAddToCart}
                                onIncreaseDecrease={onIncreaseDecrease}
                            />
                        })}
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}
