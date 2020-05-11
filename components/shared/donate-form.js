import { useState, useEffect } from 'react'
import { Form, Input, Select, InputNumber, notification } from 'antd'
import donateService from '../../services/donate-service'
import userService from '../../services/user-service'
import projectService from '../../services/project-service'
import { useDispatch, useSelector } from 'react-redux'
import storeAction from '../../redux/actions'
import moment from 'moment'
const { Option } = Select

const DonateForm = props => {
    const user = useSelector(state => state.User)
    const dispatch = useDispatch()
    const { lang } = props
    const [state, setState] = useState({
        dataUserFront: [],
        dataLogin: [],
        dataProject: [],
        valueDonate: '',
        visible: true
    })

    useEffect(() => {
        async function fetchData() {
            let projectResp = await projectService.getProjects()
            let loginRep = JSON.parse(localStorage.getItem('auth'))
            let userFrontResp = localStorage.token ? await userService.getUserFront():null
            if(userFrontResp){
            if (userFrontResp.data.length === 0) {
                dispatch({ type: storeAction.ORDER_INIT, payload: userFrontResp.data })
            }
            var userDonate = userFrontResp.data.filter(item => item.fbId === loginRep.id)
            setState(s => ({
                ...s,
                dataUserFront: userFrontResp.data,
                dataLogin: loginRep,
                dataProject: projectResp.data,
                userId: userDonate[0]._id
            }))
        }
        setState(s => ({
            ...s,
            dataLogin: loginRep,
            dataProject: projectResp.data,
        }))}
        fetchData()
    }, [])
    const handleInputChange = event => {
        var value = event.target.value
        setState(s => ({
            ...s,
            name: value
        }))
    }

    const handleProjectChange = event => {
        var value = event.target.value
        setState(s => ({
            ...s,
            project: value
        }))
    }

    const onChangeDonate = value => {
        setState(s => ({
            ...s,
            number: value
        }))
    }

    const onCurrencyChange = value => {
        setState(s => ({
            ...s,
            money: value
        }))
    }

    const transferInfo = () => {
        return (
            <div className='text-style'>
                <h4>{lang.ATMinformation.transferinfo}</h4>
                <p><span>{lang.ATMinformation.stk}</span>{lang.ATMinformation.accountNumber}</p>
                <p><span>{lang.ATMinformation.owner}</span>{lang.ATMinformation.accountName}</p>
                <p><span>{lang.ATMinformation.bank}</span>{lang.ATMinformation.bankName}</p>
            </div>
        )
    }

    const showProject = () => {
        if (state.dataProject) {
            return state.dataProject.map((item, index) => {
                let convertDate = moment(item.date).format('DD/MM/YYYY')
                if (
                    moment()
                        .subtract(1, 'days')
                        .isBefore(moment(convertDate, 'DD/MM/YYYY'))
                ) {
                    return (
                        <option key={index} value={item.name}>
                            {item.name}
                        </option>
                    )
                }
                return null
            })
        }
        return null
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                if(localStorage.token){
                let param = {
                    name: state.dataLogin.name,
                    money: Number(state.number),
                    unit: state.money,
                    userId: state.userId,
                    project: state.project
                }
                if(props.form.getFieldValue('name')){
                    param['name']= props.form.getFieldValue('name')
                }
                if(props.form.getFieldValue('unit')){
                    param['unit']= props.form.getFieldValue('unit')
                }
                let arrayField = Object.keys(props.form.getFieldsValue())
                arrayField.forEach(field => {
                    
                    if (props.form.isFieldTouched(field)) {
                        param[field] = props.form.getFieldValue(field)
                    }
                })
                donateService.addDonate(param).then(res => {
                    setState(s=>({...s, valueDonate: res.status}))
                    if (res.status === 0) {
                            const args = {
                                message: (
                                    <div className='add-to-cart'>
                                        <p className='text'>
                                            <i className='fas fa-check-circle'></i>
                                            {lang.validate.successDonate}
                                        </p>
                                    </div>
                                ),
                                duration: 2,
                                top: 70,
                                right: 20,
                                className: 'messenge'
                            }
                            notification.open(args)
                            // props.onCancel()
                        }
                        else {
                            const args = {
                                message: (
                                    <div className='add-to-cart'>
                                        <p className='text'>
                                            <i className='fas fa-times error'></i>
                                            {lang.validate.errorDonate}
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
                    })

                    .catch(err => console.log(err))
                // props.onCancel()
            }else{
                let param = {
                    name: state.name,
                    money: Number(state.number),
                    unit: state.money,
                    project: state.project
                }
                if(props.form.getFieldValue('name')){
                    param['name']= props.form.getFieldValue('name')
                }
                if(props.form.getFieldValue('unit')){
                    param['unit']= props.form.getFieldValue('unit')
                }
                let arrayField = Object.keys(props.form.getFieldsValue())
                arrayField.forEach(field => {
                    
                    if (props.form.isFieldTouched(field)) {
                        param[field] = props.form.getFieldValue(field)
                    }
                })
                donateService.addDonate(param).then(res => {
                    setState(s=>({...s, valueDonate: res.status}))
                        if (res.status === 0) {
                            const args = {
                                message: (
                                    <div className='add-to-cart'>
                                        <p className='text'>
                                            <i className='fas fa-check-circle'></i>
                                            {lang.validate.successDonate}
                                        </p>
                                    </div>
                                ),
                                duration: 2,
                                top: 70,
                                right: 20,
                                className: 'messenge'
                            }
                            notification.open(args)
                            // props.onCancel()
                        }
                        else {
                            const args = {
                                message: (
                                    <div className='add-to-cart'>
                                        <p className='text'>
                                            <i className='fas fa-times error'></i>
                                            {lang.validate.errorDonate}
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
                    })

                    .catch(err => console.log(err))
                // props.onCancel()
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
    
    if(state.valueDonate !== ''){
        return (
            <Form>
            <div className='text-style'>
            <h4>{lang.donate.infoDonate}</h4>
            <p><span>{lang.donate.name}</span>{state.name? state.name: state.dataLogin.name}</p>
            <p><span>{lang.donate.money}</span>{new Intl.NumberFormat('en-GB', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                          }).format(state.number)} <label>{getFieldValue('unit')}</label></p>
            <p><span>{lang.donate.project}</span>{state.project}</p>
            </div>
            {transferInfo()}
            <button className='btn-submit close' onClick={handleCancel}>
                    {lang.button.close}
            </button>
            </Form>
        )
    }else{
        return (
            <Form id='donate-modal' onSubmit={handleSubmit} method='POST'>
                <Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: lang.validate.errorFullname, whitespace: true }],
                            initialValue: state.dataLogin ? state.dataLogin.name: null
                        })(
    
                            <Input
                                placeholder='Họ và tên'
                                onChange={handleInputChange}
                                id='name'
                                name='name'
                                style={{marginRight: '5px'}}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className='input-number'>
                        {getFieldDecorator('number', {
                            rules: [
                                {
                                    required: true,
                                    message: lang.validate.errorMoney
                                }
                            ],
                            initialValue: state.number ? state.number : null
                        })(
                            <InputNumber
                                placeholder='Nhập số tiền'
                                name='number'
                                min={1}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={onChangeDonate}
                                style={{marginLeft: '5px'}}
                            />
                        )}
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Form.Item>
                        {getFieldDecorator('unit', {
                            rules: [
                                {
                                    required: true,
                                    message: lang.validate.errorValue
                                }
                            ],
                            initialValue: 'VND'
                        })(
                            <Select
                                style={{marginRight: '5px'}}
                                name='select'
                                onChange={onCurrencyChange}>
                                <Option name='VND' value='VND'>
                                    VND
                                </Option>
                                <Option name='USD' value='USD'>
                                    USD
                                </Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('project', {
                            initialValue: state.project
                        })(
                            <div>
                                <Input
                                    style={{marginLeft: '5px'}}
                                    placeholder='Chọn dự án'
                                    list='project'
                                    onChange={handleProjectChange}
                                />
                                <datalist id='project'>{showProject()}</datalist>
                            </div>
                        )}
                    </Form.Item>
                </Form.Item>
                {transferInfo()}
                <button className='btn-submit' type='submit'>
                    {lang.button.regist}
                </button>
            </Form>
        )
    }
}

export default Form.create({ name: 'form' })(DonateForm)
