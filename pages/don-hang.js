import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import storeAction from '../redux/actions'
import { Col, Row, Popconfirm, Tag, message } from 'antd'
import orderService from '../services/order-service'
import productService from '../services/product-service'
import userService from '../services/user-service'
import * as moment from 'moment'
const noImage = 'static/no-image.jpg'
import Head from 'next/head'
import { isArray } from 'util'
import ProductBreadcrumb from '../components/container/order/order-breadcrumb'

const Order = props => {
    // Get state from Redux
    const product = useSelector(state => state.product)
    const order = useSelector(state => state.Order)
    const user = useSelector(state => state.User)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        dataSource: [],
        dataProduct: [],
        dataOrder: [],
        dataUserFront: [],
        dataUser: [],
        visible: 2
    })

    useEffect(() => {
        async function fetchData() {
            let orderVisible = state.visible + 3
            let userRep = JSON.parse(localStorage.getItem('auth'))
            let productResp = product.data.length > 0 ? product : await productService.getProducts()
            let orderResp = order ? order.data : await orderService.getOrder()
            let userFrontResp = user ? user.data : await userService.getUserFront()
            if (productResp.data.length === 0) {
                dispatch({ type: storeAction.PRODUCT_INIT, payload: productResp.data })
            }
            if (orderResp.data.length === 0) {
                dispatch({ type: storeAction.ORDER_INIT, payload: orderResp.data })
            }
            if (userFrontResp.data.length === 0) {
                dispatch({ type: storeAction.ORDER_INIT, payload: userFrontResp.data })
            }
            var idUserFront = ''
            if (userFrontResp.data) {
                userFrontResp.data.map(item => {
                    if (item.fbId === userRep.id) {
                        idUserFront = item._id
                    }
                })
            }
            var dataMyOrder = []
            if (orderResp.data) {
                orderResp.data.map(e => {
                    if (e.user) {
                        if (e.user.id === idUserFront) {
                            dataMyOrder.push(e)
                        }
                    }
                })
            }
            setState(s => ({
                ...s,
                dataProduct: productResp.data,
                dataSource: orderResp.data,
                dataUserFront: userFrontResp.data,
                dataUser: userRep,
                dataMyOrder: dataMyOrder,
                visible: orderVisible
            }))
        }

        fetchData()
    }, [])

    const loadMore = () => {
        setState(s => ({
            ...s,
            visible: state.visible + 5
        }))
    }

    const changeDeliverStatusCancal = (item, item2) => {
        var param = {
            productId: item2.id
        }
        orderService
            .editOrder(item._id, param)
            .then(async res => {
                if (res.status === 0) {
                    message.success(props.lang.order.changeDeliverStatusCancalSuccess, 2)
                    const updateOrder = await orderService.getOrder()
                    const updateUserFront = await userService.getUserFront()
                    var idUserFront = ''
                    if (updateUserFront.data) {
                        updateUserFront.data.map(item => {
                            if (item.fbId === state.dataUser.id) {
                                idUserFront = item._id
                            }
                        })
                    }
                    var updateDataMyOrder = []
                    if (updateOrder.data) {
                        updateOrder.data.map(e => {
                            if (e.user) {
                                if (e.user.id === idUserFront) {
                                    updateDataMyOrder.push(e)
                                }
                            }
                        })
                    }
                    setState(s => ({ ...s, dataMyOrder: updateDataMyOrder }))
                } else {
                    message.error(props.lang.order.error, 2)
                }
            })
            .catch(err => {
                message.error(props.lang.order.error, 2)
                console.log(err)
            })
    }

    const showActionCancal = (item, item2) => {
        if (item2.payStatus === 1 && item2.deliverStatus === 1) {
            return (
                <Popconfirm
                    placement='bottomRight'
                    title={props.lang.order.cancelOrder}
                    onConfirm={() => changeDeliverStatusCancal(item, item2)}
                    okText='Có'
                    cancelText='Không'>
                    <Tag
                        className='btn-action shadow'
                        color='orange'
                        style={{ textAlign: 'center' }}>
                        <i className='far fa-trash-alt' />
                    </Tag>
                </Popconfirm>
            )
        }
    }

    const cancelOrder = (item, item2) => {
        if (item2.deliverStatus === 2) {
            return  <Tag
            color='#2db7f5'
            style={{
                width: '102px',
                textAlign:
                    'center'
            }}
        >
            {
                props.lang.order
                    .deliverStatus2
            }
        </Tag>
        } else if (item2.deliverStatus === 3) {
            return <Tag color='#959595'>{props.lang.order.deliverStatus3}</Tag>
        } else {
            return  <Tag
            color='blue'
            className='btn-action'
            style={{
                width: '102px',
                textAlign:
                    'center'
            }}
        >
            {
                props.lang.order
                    .deliverStatus1
            }
        </Tag>
        }
    }
    const changeStatusOrder = (item, item2) => {
        if (item2.deliverStatus !== 3) {
            if (item2.payStatus === 1) {
                return <Tag
                    color='green'
                    className='btn-action'
                    style={{
                        width: '102px',
                        textAlign: 'center'
                    }}>
                    {props.lang.order.payStatus1}
                </Tag>
            } else {
                return  <Tag
                color='#87d068'
                style={{
                    width: '102px',
                    textAlign:
                        'center'
                }}
            >
                {
                    props.lang.order
                        .payStatus2
                }
            </Tag>
            }
        }
    }

    const listOrder = () => {
        if (state.dataMyOrder) {
            return state.dataMyOrder.slice(0, state.visible).map((item, key) => {
                return (
                    <Fragment key={key}>
                        <Head>
                            <title>Schance - Đơn hàng</title>
                        </Head>
                        <Row gutter={24}>
                            {item.productList
                                ? item.productList.map((item2, key) => {
                                      return (
                                          <Fragment key={key}>
                                              <Col span={24}>
                                                  <Col xs={6} sm={6} md={4} lg={3}>
                                                      {state.dataProduct.map((item3, key) => {
                                                          if (item2.id === item3._id) {
                                                              return (
                                                                  <div
                                                                      className='box-img'
                                                                      key={key}>
                                                                      {item3.imageUrl ? (
                                                                          <img
                                                                              src={
                                                                                  item3.imageUrl
                                                                                      ? `https://groupbongda.s3-ap-southeast-1.amazonaws.com${item3.imageUrl}`
                                                                                      : noImage
                                                                              }
                                                                              alt={item3.imageUrl}
                                                                          />
                                                                      ) : (
                                                                          <img
                                                                              src={noImage}
                                                                              alt={noImage}
                                                                          />
                                                                      )}
                                                                  </div>
                                                              )
                                                          }
                                                      })}
                                                  </Col>
                                                  <Col xs={12} sm={12} md={6} lg={7}>
                                                      <div className='name-order'>{item2.name}</div>
                                                      {state.dataProduct.map((item3, key) => {
                                                          if (item2._id === item3._id) {
                                                              return (
                                                                  <div className='item'>
                                                                      {props.lang.cart.provided}
                                                                      <span className='box-company'>
                                                                          {item3.company.name}
                                                                      </span>
                                                                  </div>
                                                              )
                                                          }
                                                      })}
                                                  </Col>
                                                  <Col
                                                      xs={6}
                                                      sm={5}
                                                      md={3}
                                                      lg={3}
                                                      className='price-sm'
                                                      style={{
                                                          textAlign: 'right',
                                                          paddingRight: '50px'
                                                      }}>
                                                      <div>
                                                          {item2.price
                                                              ? new Intl.NumberFormat('en-GB', {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                }).format(item2.price) + ' đ'
                                                              : ''}
                                                      </div>
                                                  </Col>
                                                  <Col
                                                      xs={4}
                                                      sm={4}
                                                      md={2}
                                                      lg={2}
                                                      className='item-sm'
                                                      style={{ textAlign: 'left' }}>
                                                      x {item2.count}
                                                  </Col>
                                                  <Col
                                                      xs={5}
                                                      sm={5}
                                                      md={3}
                                                      lg={3}
                                                      className='item-sm'
                                                      style={{
                                                          textAlign: 'right',
                                                          paddingRight: '50px'
                                                      }}>
                                                      <div>
                                                          {item2.total
                                                              ? new Intl.NumberFormat('en-GB', {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                }).format(item2.total) + ' đ'
                                                              : ''}
                                                      </div>
                                                  </Col>
                                                  <Col
                                                      xs={12}
                                                      sm={12}
                                                      md={3}
                                                      lg={3}
                                                      className='box-item'>
                                                      {changeStatusOrder(item, item2)}
                                                  </Col>
                                                  <Col
                                                      xs={12}
                                                      sm={12}
                                                      md={3}
                                                      lg={3}
                                                      className='box-item'>
                                                      {cancelOrder(item, item2)}
                                                  </Col>
                                                  {showActionCancal(item, item2)}
                                              </Col>
                                          </Fragment>
                                      )
                                  })
                                : null}
                            <Row className='box-user'>
                                <Col sm={24} lg={12} className='box-info'>
                                    <h4>{props.lang.order.shippingAddress}</h4>
                                    <p>
                                        <b>{item.user.name}</b>
                                    </p>
                                    <p>{item.user.tel}</p>
                                    <p>{item.user.address}</p>
                                    <p style={{marginBottom: 0, textAlign: 'right'}}>{props.lang.send_mail_order.orderNo}: <b>{item.orderNo ? item.orderNo : null}</b></p>
                                </Col>
                                <Col sm={24} lg={12} className='mb-0 box-price'>
                                    <div>
                                        <h5 className='date'>
                                            {props.lang.order.date}
                                            <span>
                                                {moment(item.insertTime).format('DD/MM/YYYY')}
                                            </span>
                                        </h5>
                                    </div>
                                    <div className='box-total'>
                                        <div className='total-money'>
                                            <h4>{props.lang.order.totalMoney}</h4>
                                            <h3>
                                                {new Intl.NumberFormat('en-GB', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(item.total) + ' ₫'}
                                            </h3>
                                        </div>
                                        <div>
                                            <p>{props.lang.cart.supported}: </p>
                                            <p>
                                                {new Intl.NumberFormat('en-GB', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(item.donateMoney) + ' ₫'}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Fragment>
                )
            })
        }
    }

    const pageOrder = () => {
        var checkDataOrder = null
        if (state.dataMyOrder !== [] && state.dataMyOrder ? state.dataMyOrder.length : null) {
            checkDataOrder = state.dataMyOrder
        }
        if (checkDataOrder) {
            return (
                <div className='box-page box-order'>
                    <ProductBreadcrumb lang={props.lang} />
                    <div className='container-page'>
                        <div className='list-header-main'>
                            <h2>{props.lang.order.title}</h2>
                        </div>
                        <Row className='box-title'>
                            <Col span={24}>
                                <Col xs={6} sm={6} md={4} lg={3}>
                                    {props.lang.order.image}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={7}>
                                    {props.lang.order.productName}
                                </Col>
                                <Col xs={5} sm={5} md={3} lg={3}>
                                    {props.lang.order.price}
                                </Col>
                                <Col xs={4} sm={4} md={2} lg={2}>
                                    {props.lang.order.amount}
                                </Col>
                                <Col xs={5} sm={5} md={3} lg={3}>
                                    {props.lang.cart.intoMoney}
                                </Col>
                                <Col xs={12} sm={12} md={3} lg={3} className='status-order'>
                                    {props.lang.order.payStatus}
                                </Col>
                                <Col xs={12} sm={12} md={3} lg={3} className='status-order'>
                                    {props.lang.order.deliveredStatus}
                                </Col>
                            </Col>
                        </Row>
                        {listOrder()}
                        <div className='load-more'>
                            {state.visible < state.dataSource.length && (
                                <button
                                    onClick={() => loadMore()}
                                    type='button'
                                    className='load-more'>
                                    {props.lang.loadMore}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )
        } else
            return (
                <div className='empty-order'>
                    <div className='empty-cart container-page'>
                        <h4>{props.lang.order.emptyOrder}</h4>
                        <a className='btn btn-yellow' href='/'>
                            {props.lang.order.continueShopping}
                        </a>
                    </div>
                </div>
            )
    }

    return (
        <Fragment>
            <Head>
                <title>Schance - Đơn hàng</title>
            </Head>
            {pageOrder()}
        </Fragment>
    )
}
export default Order
