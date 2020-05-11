import { useState, Fragment } from 'react'
import { Row, Col, Button, message } from 'antd'
import SponsorForm from './sponsor-form'
import MainModal from '../modal/main-modal'
import Link from 'next/link'
import Slider from 'react-slick'

const bgImg = 'static/map.png'

const Company = props => {
    const { lang, companies } = props
    const [state, setState] = useState({})

    const onShowModal = _ => {
        if (JSON.parse(localStorage.getItem('auth'))) {
            setState(s=>({...s,
                visible: true
            }))
        } else {
            message.warning(lang.validate.warn)
        }
    }

    const handleCancel = _ => {
        setState(s=>({...s,
            visible: false
        }))
    }

    const renderSponsorForm = _ => {
        return <SponsorForm lang={lang} onCancel={handleCancel} />
    }

    function SampleNextArrow(props) {
        const {onClick } = props;
        return (
            <button className="slick-arrow slick-next" onClick={onClick}>
                <i className="fas fa-chevron-right" />
            </button>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <button className="slick-arrow slick-prev" onClick={onClick}>
                <i className="fas fa-chevron-left" />
            </button>
        )
    }

    var settings_silde = {
        dots: false,
        infinite: true,
        loop: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: companies.length >= 5 ? 5 : companies.length,
        slidesToScroll: companies.length >= 5 ? 5 : companies.length,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: companies.length >= 4 ? 4 : companies.length,
                    slidesToScroll: companies.length >= 4 ? 4 : companies.length,
                    initialSlide: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: companies.length >= 3 ? 3 : companies.length,
                    slidesToScroll: companies.length >= 3 ? 3 : companies.length,
                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: companies.length >= 2 ? 2 : companies.length,
                    slidesToScroll: companies.length >= 2 ? 2 : companies.length,
                    initialSlide: 2
                }
            }
        ],
        vertical: false,
        verticalSwiping: false
    }

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            <div className='company-page' style={{ backgroundImage: `url(${bgImg})` }}>
                <div className='container-page'>
                    <div className='box-product'>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <div className='elementor-widget-wrap'>
                                    <div className='title-company'>
                                        <div className='elementor-widget-container'>
                                            <div className='heading'>
                                                <h2 className='title'>{lang.company.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='company-text'>
                                        <div className='elementor-widget-container'>
                                            <p>{lang.company.companyText}</p>
                                        </div>
                                    </div>
                                    <div className='column-padding-custom1'>
                                        <Button
                                            className='btnJoin'
                                            type='primary'
                                            onClick={onShowModal}>
                                            {lang.company.button}
                                        </Button>
                                        <MainModal
                                            title={lang.form.title}
                                            visible={state.visible}
                                            children={renderSponsorForm()}
                                            onCancel={handleCancel}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <div className='elementor-widget-wrap'>
                                    <ul className='fundpress-partners'>
                                        <Slider {...settings_silde}>
                                            {companies.map((v, i) => (
                                                <li key={i}>
                                                    {v.logo && (
                                                        <a href={v.website} target='_blank'>
                                                            <img
                                                                src={
                                                                    'https://groupbongda.s3-ap-southeast-1.amazonaws.com' +
                                                                    v.logo
                                                                }
                                                                alt=''
                                                            />
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </Slider>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Company
