import storeAction from '../../../redux/actions'
const noImage = 'static/no-image.jpg'

const CartItem = props => {
    const { cart, lang, quantity } = props

    const showPrice = item => {
        if (item.promotePrice === '' || item.promotePrice === null) {
            return parseInt(item.price)
        } else {
            return parseInt(item.promotePrice)
        }
    }

    const showDonate = (item, promote) => {
        return Math.floor(((item.price - promote) / item.price) * 100)
    }

    const promotePrice = showPrice(cart)
    
    const donate = showDonate(cart, promotePrice)

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
        let payload = {
            cart: cart,
            quantity: parseInt(currentQlt)
        }
        var { onUpdateProductInCart } = props
        onUpdateProductInCart(storeAction.CARD_UPDATE, payload)
    }

    const onDelete = _ => {
        let payload = {
            cart: cart
        }
        var { onDeleteProductInCart } = props
        onDeleteProductInCart(storeAction.CARD_REMOVE, payload)
    }

    return (
        <div className='cart-item-box' key={cart._id}>
            <div className='cart-item-left'>
                <div className='img-product'>
                    <img
                        src={
                            cart.imageUrl
                                ? 'https://groupbongda.s3-ap-southeast-1.amazonaws.com' +
                                  cart.imageUrl
                                : noImage
                        }
                    />
                </div>
                <div className='content'>
                    <p className='title autotion-animetion'>{cart.name}</p>
                    <div className='product-company'>
                        <span className='text-company'>{lang.cart.provided} </span>
                        <p className='company autotion-animetion'>{cart.company.name}</p>
                    </div>
                    <div className='action-cart'>
                        <span className='button-delete' onClick={onDelete}>
                            {lang.cart.delete}
                        </span>
                    </div>
                </div>
            </div>
            <div className='cart-item-middle'>
                <p className='current-price'>
                    {cart.promotePrice
                        ? new Intl.NumberFormat('en-GB', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                          }).format(cart.promotePrice) + ' đ'
                        : new Intl.NumberFormat('en-GB', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                          }).format(cart.price) + ' đ'}
                </p>
                <div className='box-discount'>
                    <p className='origin-price'>
                        {cart.price ? (
                            new Intl.NumberFormat('en-GB', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(cart.price) + ' đ'
                        ) : (
                            <a className='contact' href={cart.url}>
                                {lang.cart.contact}
                            </a>
                        )}
                    </p>
                    <span>|</span>
                    <p className='discount-rate'>
                        {new Intl.NumberFormat('en-GB', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(cart.donateRate? cart.donateRate: 0) + '%'}
                    </p>
                </div>
            </div>
            <div className='cart-item-right'>
                <span className='button is-medium' onClick={onIncreaseDecrease}>
                    -
                </span>
                <span id={`cit-${cart._id}`} className='button is-medium'>
                    {quantity}
                </span>
                <span className='button is-medium' onClick={onIncreaseDecrease}>
                    +
                </span>
            </div>
        </div>
    )
}

export default CartItem
