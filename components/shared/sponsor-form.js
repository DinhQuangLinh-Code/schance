import { useState, useEffect } from 'react'
import { Form, Input, notification } from 'antd'
import registService from '../../services/regist-service'
import userService from '../../services/user-service'
import { useDispatch, useSelector } from 'react-redux'
import storeAction from '../../redux/actions'
const { TextArea } = Input
const SponsorForm = props => {
    const { lang } = props
    const user = useSelector(state => state.User)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        companyName: '',
        email: '',
        business: '',
        name: '',
        content: '',
        userId: '',
        dataLogin: [],
        dataUserFront:[],
        valueSponsor: '',
        visible: true
    })

    useEffect(() => {
        async function fetchData() {
            let loginRep = JSON.parse(localStorage.getItem('auth'))
            let userFrontResp = await userService.getUserFront()
            var userRegist = userFrontResp.data.filter(item => item.fbId === loginRep.id)
            setState(s => ({
                ...s,
                dataUserFront: userFrontResp.data,
                dataLogin: loginRep,
                userId: userRegist[0]._id
            }))
        }

        fetchData()
    }, [])
    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields( async (err, values) => {
            if (!err) {
                let param = { status: 1,userId: state.userId}
                if(props.form.getFieldValue('name')){
                    param['name']= props.form.getFieldValue('name')
                }
                let arrayField = Object.keys(props.form.getFieldsValue())
                arrayField.forEach(field => {
                    
                    if (props.form.isFieldTouched(field)) {
                        param[field] = props.form.getFieldValue(field)
                    }
                })
                let resp = await registService.addRegist(param)
                setState(s=>({...s, valueSponsor: resp.status}))
                if (resp.status === 0) {
                    const args = {
                        message: (
                            <div className='add-to-cart'>
                                <p className='text'>
                                    <i className='fas fa-check-circle'></i>
                                    {lang.validate.success}
                                </p>
                            </div>
                        ),
                        duration: 2,
                        top: 70,
                        right: 20,
                        className: 'messenge'
                    }
                    notification.open(args)
                } else {
                    const args = {
                        message: (
                            <div className='add-to-cart'>
                                <p className='text'>
                                    <i className='fas fa-times error'></i>
                                    {lang.validate.error}
                                </p>
                            </div>
                        ),
                        duration: 2,
                        top: 70,
                        right: 20,
                        className: 'messenge'
                    }
                    notification.open(args)
                }
            }
        })
    }

    const handleCancel = e => {
        setState(s =>({...s,
          visible: props.onCancel(),
        }))
    }

    const { getFieldDecorator, getFieldValue } = props.form
    if(state.valueSponsor !== ''){
        return(
            <Form>
            <div className='text-style'>
            <h4>{lang.sponsor.infoSponsor}</h4>
            <p><span>{lang.sponsor.companyName}</span>{getFieldValue('companyName')}</p>
            <p><span>{lang.sponsor.email}</span>{getFieldValue('email')} </p>
            <p><span>{lang.sponsor.business}</span>{getFieldValue('business')}</p>
            <p><span>{lang.sponsor.name}</span>{getFieldValue('name')}</p>
            <p><span>{lang.sponsor.content}</span>{getFieldValue('content')}</p>
            <button className='btn-submit close' onClick={handleCancel}>
                    {lang.button.close}
            </button>
            </div>
            </Form>
        )
    }else{
        return (
            <Form id='regist-company' onSubmit={handleSubmit} method='POST'>
                <Form.Item>
                    {getFieldDecorator('companyName', {
                        rules: [
                            {
                                max: 50,
                                message: lang.validate.maxName
                            },
                            {
                                required: true,
                                message: lang.validate.errorCompanyName, whitespace: true
                            }
                        ],
                        initialValue: state.companyName
                    })(
                        <Input
                            type='text'
                            className='form-control mb-2 mr-sm-2'
                            id='companyName'
                            placeholder={lang.company.sponsor_form.name_placeholder}
                            name='companyName'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: lang.validate.isEmail
                            },
                            {
                                required: true,
                                message: lang.validate.errorEmail
                            }
                        ],
                        initialValue: state.email
                    })(
                        <Input
                            type='text'
                            className='form-control mb-2 mr-sm-2'
                            id='email'
                            placeholder={lang.company.sponsor_form.email_placeholder}
                            name='email'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('business', {
                        rules: [
                            {
                                required: true,
                                message: lang.validate.errorBusiness, whitespace: true
                            }
                        ],
                        initialValue: state.business
                    })(
                        <Input
                            type='text'
                            className='form-control mb-2 mr-sm-2'
                            id='business'
                            placeholder={lang.company.sponsor_form.business_placeholder}
                            name='business'
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: lang.validate.errorRepresentative, whitespace: true
                            }
                        ],
                        initialValue: state.dataLogin ? state.dataLogin.name : null
                    })(
                        <Input
                            type='text'
                            className='form-control mb-2 mr-sm-2'
                            id='name'
                            placeholder={lang.company.sponsor_form.agent_placeholder}
                            name='name'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [
                            {
                                min: 6,
                                message: lang.validate.minLength
                            },
                            {
                                required: true,
                                message: lang.validate.errorContent, whitespace: true
                            }
                        ],
                        initialValue: state.content
                    })(
                        <TextArea
                            type='text'
                            className='form-control mb-2 mr-sm-2'
                            id='content'
                            placeholder={lang.company.sponsor_form.content_placeholder}
                            name='content'
                        />
                    )}
                </Form.Item>

                <button type='submit' className='btn btn-primary mb-2 register'>
                    {lang.form.button}
                </button>
            </Form>
    )}
}

export default Form.create({ name: 'form' })(SponsorForm)
