import { Fragment, useState, useEffect } from 'react'
import { Steps, Button,notification } from 'antd'
import Login from '../../layout/login'
import PaymentForm from '../../shared/payment/payment-form'
import PaymentAddress from '../../shared/payment/payment-address'
import PaymentOrder from '../../shared/payment/payment-order'
import userService from '../../../services/user-service'
import orderService from '../../../services/order-service'
import {useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router';
import axios from 'axios'
import { Message } from '../order/send-mail'
const { Step } = Steps
const PaymentStep = props => {
    const myCart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        active: true,
        current: 1,
        address: '',
        payment: 1,
        orderNo: '',
        cart: [],
        dataUser: [],
        userLogin:[]
    })

    useEffect(() => {
        async function fetchData() {
        if (process.browser) {
            if(localStorage.token){
            let userLoginRep = JSON.parse(localStorage.getItem('auth'))
            let UserFrontResp = await userService.getUserFront()
            if (UserFrontResp.data.length === 0) {
                dispatch({ type: storeAction.USER_INIT, payload: UserFrontResp.data })
            }
            var a = UserFrontResp.data.map((item, index)=>{
                setState(s=>({...s, data: item}))
            })
           
            if(!localStorage.cart){
                document.getElementById('steps').style.display = 'none'
                document.getElementById('buyContinute').style.display = 'block'
            }
        
            if(JSON.parse(localStorage.getItem('load'))){
                document.getElementById('steps').style.display = 'none'
                document.getElementById('buyContinute').style.display = 'block'
                setState(s => ({
                    ...s,
                    current: 2
                }))
                localStorage.removeItem('load')
            }else{
                setState(s => ({
                    ...s,
                    current: userLoginRep ? 1 : 0
                }))
                localStorage.removeItem('order')
            }
            setState(s => ({
                ...s,
                active: JSON.parse(localStorage.getItem('address')) ? false : true,
                address: JSON.parse(localStorage.getItem('address'))
                    ? JSON.parse(localStorage.getItem('address'))
                    : '',
                cart: JSON.parse(localStorage.getItem('cart'))
                    ? JSON.parse(localStorage.getItem('cart'))
                    : '',
                order: JSON.parse(localStorage.getItem('order')) ? JSON.parse(localStorage.getItem('order')) : '',
                dataUser: UserFrontResp.data,
                userLogin: userLoginRep
            }))}
              else{
                setState(s => ({
                    ...s,
                    active: JSON.parse(localStorage.getItem('address')) ? false : true,
                    address: JSON.parse(localStorage.getItem('address'))
                        ? JSON.parse(localStorage.getItem('address'))
                        : '',
                    cart: JSON.parse(localStorage.getItem('cart'))
                        ? JSON.parse(localStorage.getItem('cart'))
                        : '',
                    order: JSON.parse(localStorage.getItem('order')) ? JSON.parse(localStorage.getItem('order')) : '',
                    current: JSON.parse(localStorage.getItem('auth')) ? 1 : 0,
                }))
            }
        }
    }
    fetchData()}
    , []) 

    const { lang } = props

    const onEditAddress = _ => {
        setState(s => ({
            ...s,
            active: true
        }))
    }

    const onCancelUpdate = _ => {
        setState(s => ({
            ...s,
            active: false
        }))
    }

    const onchangeAddress = value => {
        localStorage.setItem('address', JSON.stringify(value))
        setState(s => ({
            ...s,
            active: false,
            address: JSON.parse(localStorage.getItem('address'))
                ? JSON.parse(localStorage.getItem('address'))
                : ''
        }))
    }
    const onNextStep = _ => {
        setState(s => ({
            ...s,
            current: 2
        }))
    }

    const onChange = event => {
        var target = event.target
        var value = target.value
        setState(s => ({
            ...s,
            payment: value
        }))
    }

    const onOrder = _ => {
        const { cart, address,dataUser ,userLogin, payment } = state
       
        var productList = cart.map(item => {
            return {
                id: item.cart._id,
                count: item.quantity
            }
        })

        var userFront = null
        var a = dataUser.map(item2 => {
        if(item2.fbId === userLogin.id) {
        const param = {
            user: {
                id: item2._id,
                name: address.userName,
                address: address.address,
                tel: address.phone
            },
            productList,
            payment: payment
        }
        orderService
            .createOrder(param)
            .then(res => {
                if (res.status === 0) {
                    const args = {
                        message: (
                            <div className='add-to-cart'>
                                <p className='text'>
                                    <i className='fas fa-check-circle'></i>
                                    {lang.payment.messegeOrder}
                                </p>
                            </div>
                        ),
                        duration: 2,
                        top: 25,
                        right: 50,
                        className: 'messenge'
                    }
                    var orderNo = res.data[0].orderNo ? res.data[0].orderNo : ''
                    var totalPrice = 0
                    var totalDonate = 0
                    cart.map(item => {
                        totalPrice += item.cart.promotePrice ? Number(item.cart.promotePrice) * item.quantity : Number(item.cart.price) * item.quantity
                        totalDonate += item.cart.promotePrice 
                            ? ((Number(item.cart.promotePrice) / 100) * Number(item.cart.donateRate)) * item.quantity
                            : ((Number(item.cart.price) / 100) * Number(item.cart.donateRate)) * item.quantity
                    })

                    var listProduct = `${state.cart.map((item, key) => {
                        return (
                            `<tr>
                                <td style='text-align: right'>${key + 1}</td>
                                <td>${item.cart.name}</td>
                                <td style='text-align: right'>
                                    ${new Intl.NumberFormat('en-GB', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(item.cart.promotePrice 
                                        ? item.cart.promotePrice 
                                        : item.cart.price)} đ
                                </td>
                                <td style='text-align: right'>${item.quantity}</td>
                                <td style='text-align: right'>
                                    ${new Intl.NumberFormat('en-GB', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(item.cart.promotePrice 
                                        ? item.cart.promotePrice * item.quantity 
                                        : item.cart.price * item.quantity)} đ
                                </td>
                                <td style='text-align: right'>
                                    ${new Intl.NumberFormat('en-GB', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(item.cart.promotePrice 
                                        ? (((item.cart.promotePrice / 100) * item.cart.donateRate) * item.quantity)
                                        : (((item.cart.price / 100) * item.cart.donateRate) * item.quantity))} đ
                                </td>
                            </tr>`
                        )
                    })}`

                    var listRecipient = []

                    var dataSendMail = {
                        lang: lang,
                        orderNo: orderNo,
                        totalPrice: totalPrice,
                        totalDonate: totalDonate,
                        address: address,
                        payment: payment,
                        listProduct: listProduct
                    }

                    var order = {
                        payment: state.payment,
                        orderNo: orderNo
                    }
                    localStorage.setItem('order', JSON.stringify(order))

                    const paramSendMail = {
                        recipient: 'test@minori.com.vn',
                        subject: lang.send_mail_order.subject,
                        message: Message(dataSendMail),
                        html: true
                    }

                    axios
                        .post('https://mailsupporting.xyz/service/v1/mail/schance', paramSendMail, {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => {
                        })
                        .catch(error => {
                            console.error(error)
                        })
                        const active = true
                        setTimeout(() => {
                        document.getElementById('steps').style.display = 'none'
                        document.getElementById('buyContinute').style.display = 'block'
                        localStorage.setItem('load', JSON.stringify(active))
                        location.reload()}, 1000)
                        notification.open(args)
                }
            })
            .catch(err => console.log(err))
        }
    })
    }
  
    const steps = [
        {
            title: lang.payment.step.titleLogin,
            content: (
                <div>
                    <h3>{lang.payment.textStep1}</h3>
                    <div className='panel-body payment-login'>
                        <Login lang={lang}/>
                    </div>
                </div>
            )
        },
        {
            title: lang.payment.step.titleAddress,
            content: (
                <div>
                    <h3>{lang.payment.textStep2}</h3>
                    {state.address && (
                        <PaymentAddress
                            lang={lang}
                            address={state.address}
                            onEditAddress={onEditAddress}
                            onNextStep={onNextStep}
                        />
                    )}
                    {state.active && (
                        <PaymentForm
                            lang={lang}
                            onchangeAddress={onchangeAddress}
                            onCancelUpdate={onCancelUpdate}
                            info={state.address}
                        />
                    )}
                </div>
            )
        },
        {
            title: lang.payment.step.titleOrder,
            content: (
                <PaymentOrder
                    lang={lang}
                    onChange={onChange}
                    value={state.payment}
                    order={state.order}
                    address={state.address}
                    dataCart={state.cart}
                />
            )
        }
    ]
    if(process.browser){
        if(JSON.parse(localStorage.getItem('load'))){
            return (
                <Fragment>
                <div className='shipping-header'>
                    <div className='container-page'>
                        <Steps current={2} className='steps-header'>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                </div>
                <div className='container-page'>
                    <div className='steps-content'>{steps[2].content}</div>
                    <div className='steps-action' id='steps'>
                        {state.current === steps.length - 1 && (
                            <Button type='primary' onClick={onOrder}>
                                {lang.payment.buttonOrder}
                            </Button>
                        )}
                    </div>
                    <div className='empty-order' style={{display: 'none', textAlign: 'right', padding: 0, width: 'unset'}} id='buyContinute'>
                    {state.current === steps.length - 1 && (
                            <a className='btn btn-yellow' href='/san-pham'>
                            {lang.cart.continueShopping}
                        </a>)}
                    </div>
                </div>
            </Fragment> )
        }else{
            return (
                <Fragment>
                    <div className='shipping-header'>
                        <div className='container-page'>
                            <Steps current={state.current} className='steps-header'>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                        </div>
                    </div>
                    <div className='container-page'>
                        <div className='steps-content'>{steps[state.current].content}</div>
                        <div className='steps-action' id='steps'>
                            {state.current === steps.length - 1 && (
                                <Button type='primary' onClick={onOrder}>
                                    {lang.payment.buttonOrder}
                                </Button>
                            )}
                        </div>
                        <div className='empty-order empty-cart' style={{display: 'none', textAlign: 'right', padding: 0, width: 'unset'}} id='buyContinute'>
                        {state.current === steps.length - 1 && (
                            <a className='btn btn-yellow' href='/san-pham'>
                            {lang.cart.continueShopping}
                        </a>)}
                    </div>
                    </div>
                </Fragment>
            )}
    }else{
        return null
    }
}

export default PaymentStep
