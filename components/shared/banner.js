import { useState, useEffect } from 'react'
import storeAction from '../../redux/actions'
import { Carousel, Button, Row, Col } from 'antd'
import lang from '../../i18n/lang-vn.json'
import MainModal from '../modal/main-modal'
import DonateForm from './donate-form'
const imageBanner1 = 'static/banner-highlands.jpg'
const imageBanner2 = 'static/banner-in-classroom.jpg'
const imageBanner3 = 'static/banner-in-sos.jpg'
import projectService from '../../services/project-service'
import companyService from '../../services/company-service'
import fundService from '../../services/fund-service'
import donateService from '../../services/donate-service'
import orderService from '../../services/order-service'

const divDonateBtn = {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: '75px'
}

const styleBtn = {
    color: '#fff',
    zIndex: 9,
    backgroundColor: 'transparent',
    padding: '10px 39px',
    borderRadius: 50,
    height: 'auto',
    border: '1px solid #fff',
}

const Banner = props => {
    const [state, setState] = useState({
        dataProject: [],
        datacompanies: [],
        dataDonate: [],
        dataOrder: []
    })

    useEffect(() => {
        async function fetchData() {
            let projectResp = await projectService.getProjects()
            let companyResp = await companyService.getCompanies()
            let fundResp = await fundService.countFund()
            setState(s=>({
                ...s,
                dataProject: projectResp.data,
                datacompanies: companyResp.data,
                dataFund: fundResp.data
            }))
        }
        fetchData()
    }, [])

    const openDonateModal = () => {
        setState(s=>({
            ...s,
            donateModalVisible: true
        }))
    }

    const closeDonateModal = () => {
        setState(s=>({
            ...s,
            donateModalVisible: false
        }))
    }

    const renderDonateForm = _ => {
        return <DonateForm lang={props.lang} onCancel={closeDonateModal} />
    }
    return (
        <div className='banner-page'>
            <div style={{ position: 'relative' }}>
                <Carousel dots={true} autoplay={true} autoplaySpeed={4000}>
                    <div className='xs-welcome-content'>
                        <img src={imageBanner1} alt={imageBanner1.toString()} />
                        <div className='content-banner'>
                            <div className='text-banner'>
                                <p>{lang.banner.text1}</p>
                                <h2>{lang.banner.text2}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='xs-welcome-content'>
                        <img src={imageBanner2} alt={imageBanner2.toString()} />
                        <div className='content-banner'>
                            <div className='text-banner'>
                                <p>{lang.banner.text3}</p>
                                <h2>{lang.banner.text4}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='xs-welcome-content'>
                        <img src={imageBanner3} alt={imageBanner3.toString()} />
                        <div className='content-banner'>
                            <div className='text-banner'>
                                <p>{lang.banner.text3}</p>
                                <h2>{lang.banner.text4}</h2>
                            </div>
                        </div>
                    </div>
                </Carousel>
                <div style={divDonateBtn} className='btn-donate'>
                    <Button style={styleBtn} onClick={openDonateModal}>
                        {lang.button.donate}
                    </Button>
                </div>
                <MainModal
                    title={lang.form.titleDonate}
                    visible={state.donateModalVisible}
                    children={renderDonateForm()}
                    onCancel={closeDonateModal}
                />
            </div>
            <div className='percentage-list text-center'>
                <div className='container-the'>
                    <Row>
                        <Col style={{ textAlign: 'center' }} xs={8} sm={8} md={8} lg={8} xl={8}>
                            <h3>{state.dataFund === true  ? 0: state.dataFund}</h3>
                            <p>{lang.banner.text8}</p>
                        </Col>
                        <Col style={{ textAlign: 'center' }} xs={8} sm={8} md={8} lg={8} xl={8}>
                            <h3>{state.dataProject ? state.dataProject.length : 0}</h3>
                            <p>{lang.banner.text10}</p>
                        </Col>
                        <Col style={{ textAlign: 'center' }} xs={8} sm={8} md={8} lg={8} xl={8}>
                            <h3>{state.datacompanies ? state.datacompanies.length : 0}</h3>
                            <p>{lang.banner.text12}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Banner
