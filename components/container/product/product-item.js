import { Col, Tooltip } from 'antd'
import Link from 'next/link'

const ProductItem = props => {
    const { lang, product, noImage, company } = props
        return (
        <Col sm={12} md={12} lg={8} key={product._id}>
            <div key={product._id} className='box-product-item'>
                <div className='used-for-colors'>
                    <div className='popular-item'>
                        <div className='item-header'>
                            <img
                                src={
                                    product.imageUrl
                                        ? 'https://groupbongda.s3-ap-southeast-1.amazonaws.com' +
                                          product.imageUrl
                                        : noImage
                                }
                                alt={product.imageUrl}
                            />
                        </div>
                        <div className='item-content'>
                            <ul className='simple-tag'>
                                <li>{product.name ? product.name : lang.product.contact}</li>
                            </ul>
                            <div className='post-title'>
                                {product.description ? product.description : ''}
                            </div>
                            <ul className='list-with-content'>
                                <li>
                                    <strong>
                                        <i className='fas fa-donate'></i>
                                        {lang.product.donate_rate}
                                    </strong>
                                    <span>
                                        <span className='woocommerce-Price-amount amount'>
                                            <Tooltip
                                                title={lang.product.dondate_rate_tooltip.replace(
                                                    lang.percent,
                                                    product.donateRate
                                                        ? product.donateRate + lang.percent
                                                        : '0%'
                                                )}>
                                                <span className='woocommerce-Price-currencySymbol donate'>
                                                    {product.donateRate
                                                        ? product.donateRate + lang.percent
                                                        : '0%'}
                                                </span>
                                            </Tooltip>
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <strong>
                                        <i className='fas fa-gift' aria-hidden='true'></i>
                                        {lang.product.pricePromotion}:
                                    </strong>
                                    <span>
                                        <span className='woocommerce-Price-amount amount promotion'>
                                            <span className='woocommerce-Price-currencySymbol'>
                                                {product.promotePrice
                                                    ? new Intl.NumberFormat('en-GB', {
                                                          minimumFractionDigits: 0,
                                                          maximumFractionDigits: 0
                                                      }).format(product.promotePrice) + ' đ'
                                                    : ''}
                                            </span>
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <strong>
                                        <i className='far fa-money-bill-alt'></i>
                                        {lang.product.price}:
                                    </strong>
                                    <span>
                                        <span className='woocommerce-Price-amount amount'>
                                            <span className='woocommerce-Price-currencySymbol'>
                                                {product.price ? (
                                                    new Intl.NumberFormat('en-GB', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    }).format(product.price) + ' đ'
                                                ) : (
                                                    <a className='contact' href={product.url}>
                                                        {lang.product.contact}
                                                    </a>
                                                )}
                                            </span>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <div className='media'>
                                <div className='round-avatar'>
                                    {product.company.logo && (
                                        <Link href={`/san-pham?cid=${product.company.id}`}>
                                            <a>
                                                <img
                                                    id={product.company.id}
                                                    src={
                                                        'https://groupbongda.s3-ap-southeast-1.amazonaws.com' +
                                                        product.company.logo
                                                    }
                                                    alt={noImage}
                                                />
                                            </a>
                                        </Link>
                                    )}
                                </div>
                                <div className='avatar-title'>
                                    <Link href={`/san-pham?cid=${product.company.id}`}>
                                        <a>
                                            <p onClick={props.onClick} id={product.company.id}>
                                                {product.company.name ? product.company.name : ''}
                                            </p>
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            {product.canSell ? (
                                <div className='product-button'>
                                    <div className='item-right'>
                                        <span
                                            className='button is-medium'
                                            onClick={props.onIncreaseDecrease}>
                                            -
                                        </span>
                                        <span
                                            id={`qtl-${product._id}`}
                                            className='input is-medium is-text-centered'>
                                            1
                                        </span>
                                        <span
                                            className='button is-medium'
                                            onClick={props.onIncreaseDecrease}>
                                            +
                                        </span>
                                    </div>
                                    <div className='btn-product'>
                                        <button
                                            className='btn-buy'
                                            onClick={() =>
                                                props.onAddToCart(product, `qtl-${product._id}`)
                                            }>
                                            <i className='fas fa-shopping-cart'></i>{' '}
                                            {lang.product.button}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='product-button'>
                                    <div className='btn-product'>
                                        <a
                                            href={company.website}
                                            target='_blank'
                                            rel='noopener noreferrer'>
                                            <button className='btn-buy contact'>
                                                {lang.product.contact}
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ProductItem
