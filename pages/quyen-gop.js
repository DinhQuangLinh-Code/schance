import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import storeAction from '../redux/actions'
import donateService from '../services/donate-service'
import userService from '../services/user-service'
import { Col, Row } from 'antd'
import Head from 'next/head'
import ProductBreadcrumb from '../components/container/donate/donate-breadcrumb'

const Donate = props => {
    // Get state from Redux
    const donate = useSelector(state => state.donate)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        dataDonate: [],
        visible: 2,
        dataUserFront: [],
        dataUser: []
    })

    useEffect(() => {
        async function fetchData() {
            let donateVisible = state.visible + 8
            let donateResp = donate ? donate.data : await donateService.getDonate()
            let userRep = JSON.parse(localStorage.getItem('auth'))
            let userFrontResp = await userService.getUserFront()
            var idUserFront = ''
            if (userFrontResp.data) {
                userFrontResp.data.map(item => {
                    if (item.fbId === userRep.id) {
                        idUserFront = item._id
                    }
                })
            }
            var dataMyDonate = []
            if (donateResp.data) {
                donateResp.data.map(e => {
                    if (e.user) {
                        if (e.user.id === idUserFront) {
                            dataMyDonate.push(e)
                        }
                    }
                })
            }
            setState({
                dataDonate: donateResp.data,
                visible: donateVisible,
                dataUserFront: userFrontResp.data,
                dataUser: userRep,
                dataMyDonate: dataMyDonate
            })
        }

        fetchData()
    }, [])

    const loadMore = () => {
        setState(s => ({
            ...s,
            visible: state.visible + 10
        }))
    }

    const exchange = val => {
        if (val.money && val.unit === 'VND') {
            return `${new Intl.NumberFormat('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(val.money)} ${val.unit}`
        } else if (val.money && val.unit === 'USD' && val.moneyAfterExchangeVND) {
            return `${new Intl.NumberFormat('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(val.moneyAfterExchangeVND)} VND`
        } else if (val.money && val.unit === 'USD' && !val.moneyAfterExchangeVND) {
            return `${new Intl.NumberFormat('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(val.money)} ${val.unit}`
        } else {
            return null
        }
    }

    const listDonate = () => {
        if (state.dataMyDonate) {
            return <Row gutter={24} className='box-list-donate'>
                {state.dataMyDonate.slice(0, state.visible).map((item, key) => {
                    return (
                        <Col span={24} className='box-item-donate' key={key}>
                            <Col xs={12} sm={8} md={6} lg={6}>
                                {item.name}
                            </Col>
                            <Col xs={12} sm={8} md={6} lg={4} className="price-donate">
                                <div>{exchange(item)}</div>
                            </Col>
                            <Col xs={24} sm={8} md={12} lg={10}>
                                <div><span className='title-project'>{props.lang.listdonate.project}:</span>{item.project}</div>
                            </Col>
                            <Col xs={24} sm={8} md={24} lg={4} className='status-donate'>
                                {item.status ? (
                                    item.status === 1 ? (
                                        <p className='unpaid mb-0'>
                                            {props.lang.listdonate.status1}
                                        </p>
                                    ) : item.status === 2 ? (
                                        <p className='paid mb-0'>
                                            {props.lang.listdonate.status2}
                                        </p>
                                    ) : null
                                ) : null}
                            </Col>
                        </Col>
                    )
                })}
            </Row>
        } else {
            return (
                <div className='empty-order'>
                    <div className='empty-cart'>
                        <h4>{props.lang.listdonate.emptyDonate}</h4>
                        <a className='btn btn-yellow' href='/'>
                            {props.lang.listdonate.continueDonate}
                        </a>
                    </div>
                </div>
            )
        }
    }

    const pageDonate = () => {
        var checkDataDonate = null
        if (state.dataMyDonate !== [] && state.dataMyDonate ? state.dataMyDonate.length : null) {
            checkDataDonate = state.dataMyDonate
        }
        if (checkDataDonate) {
            return (
                <div className='box-page list-donate-page'>
                    <ProductBreadcrumb lang={props.lang} />
                    <div className='container-page'>
                        <div className='list-header-main'>
                            <h2>{props.lang.listdonate.title}</h2>
                        </div>
                        <Row gutter={24} className='title-donate'>
                            <Fragment>
                                <Col span={24}>
                                    <Col xs={8} sm={8} md={8} lg={6}>
                                        {props.lang.listdonate.donor}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={4}>
                                        {props.lang.listdonate.price}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={10}>
                                        {props.lang.listdonate.project}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={4}>
                                        {props.lang.listdonate.status}
                                    </Col>
                                </Col>
                            </Fragment>
                        </Row>
                        {listDonate()}
                        <div className='load-more'>
                            {state.visible < state.dataDonate.length && (
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
                        <h4>{props.lang.listdonate.emptyDonate}</h4>
                        <a className='btn btn-yellow' href='/'>
                            {props.lang.listdonate.continueDonate}
                        </a>
                    </div>
                </div>
            )
    }

    return (
        <Fragment>
            <Head>
                <title>Schance - Quyên góp</title>
            </Head>
            {pageDonate()}
        </Fragment>
    )
}

export default Donate
