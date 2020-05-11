import { Fragment } from 'react'
import { Row, Col } from 'antd'
import * as moment from 'moment'

const About = props => {
    const { lang, projects } = props
    let dateArr = []
    projects.map((item, index)=>{
    let dateFormat = moment(item.date).format('DD/MM/YYYY') 
    let dateNow = moment().format('DD/MM/YYYY')     
        if(moment().isBefore(item.date)){
            let dateCheck = moment(item.date).diff(moment(), 'days')
            dateArr.push(dateCheck)
        }
    })
    let getDate = Math.min.apply(Math, dateArr)
    return (
        <Fragment>
            <div className='container-page about-page'>
                {projects.map((v, i) => (
                    <div key={i}>
                          {getDate === moment(v.date).diff(moment(), 'days')?
                          <Row gutter={30} key={i}>
                        <Col sm={24} md={24} lg={12}>
                            <div className='column-padding-custom1'>
                                <div className='title-page-custom1'>
                                    <p>{lang.about.headTitle}</p>
                                </div>
                                <div className='title-heading-title'>
                                    <h2>{v.name}</h2>
                                </div>
                                <div className='text-custom01'>
                                    <p>{v.description}</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={24} md={24} lg={12}>
                            <div className='column-padding-custom2'>
                                <div className='intruduction-images'>
                                    <div className='images-popup-wraper'>
                                        <img src={`https://groupbongda.s3-ap-southeast-1.amazonaws.com${v.imageUrl}`} 
                                        alt={`https://groupbongda.s3-ap-southeast-1.amazonaws.com${v.imageUrl}`} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        </Row>:null}
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default About
