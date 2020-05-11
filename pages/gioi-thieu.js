import { Fragment } from 'react'
import Head from 'next/head'
import { Col, Row } from 'antd'
import IntroduceBreadcrumb from '../components/container/product/introduce-breadcrumb'
const imgIntroduce = 'images/introduce.jpg'

const Introduce = props => {
    return (
        <Fragment>
            <Head>
                <title>Schance - Giới thiệu</title>
            </Head>
            <IntroduceBreadcrumb lang={props.lang} />
            <div className='sc-introduce-page'>
                <div className='container-page'>
                    <Row className='content-page'>
                        <Col xs={24} sm={24} md={24} lg={11} className='img'>
                            <div className='box'>
                                <img src={imgIntroduce}></img>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={13} className='content'>
                            {props.lang.introduce_page.content.map((e, k) => {
                                return <p key={k}>{e.text}</p>
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}
export default Introduce
