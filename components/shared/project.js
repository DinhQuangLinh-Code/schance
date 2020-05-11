import { Fragment } from 'react'
import { Row, Col } from 'antd'
import * as moment from 'moment'

const Project = props => {
    const { lang, projects } = props
    return (
        <Fragment>
        {projects.length > 0 ?
           <section className='project container-page'>
                <div className='title'>
                    <h2>Dự án</h2>
                </div>
                <Row className='list-project'>
                {projects.map((v, i) => (
                    <Col sm={24} md={12} lg={8} className='item' key={i}>
                        <div className='box-project'>
                            <div className='img-project'>
                                <a href=''><img src={`https://groupbongda.s3-ap-southeast-1.amazonaws.com${v.imageUrl}`} 
                                        alt={`https://groupbongda.s3-ap-southeast-1.amazonaws.com${v.imageUrl}`} /></a>
                            </div>
                            <div className='info-project'>
                                <h4 className='title-project'><a href='' title={v.name}>{v.name}</a></h4>
                                <div className='description-project'>{v.description}</div>
                                <p className='date-project'>
                                     <label>Ngày diễn ra:</label>
                                     <span>{moment(v.date).format('DD/MM/YYYY')}</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    ))}
                </Row>
        </section>:null}
        </Fragment>
    )
}

export default Project