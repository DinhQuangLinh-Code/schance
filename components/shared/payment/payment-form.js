import { Form, Input, Button } from 'antd'
import { useState, useEffect } from 'react'

const PaymentForm = props => {
    const { lang, onchangeAddress, info } = props
    
    const { getFieldDecorator } = props.form

    const onUpdateAddress = e => {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                onchangeAddress(values)
            }
        })
    }

    return (
        <div className='panel-body'>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={onUpdateAddress}>
                <Form.Item label={lang.payment.payment_form.label.name}>
                    {getFieldDecorator('userName', {
                        rules: [
                            {
                                max: 100,
                                message: lang.payment.payment_form.validate.maxName
                            },
                            {
                                required: true,
                                message: lang.payment.payment_form.validate.name
                            }
                        ],
                        initialValue: props.info ? props.info.userName: null
                    })(
                        <Input
                            type='text'
                            name='userName'
                            placeholder={lang.payment.payment_form.placeholder.name}
                        />
                    )}
                </Form.Item>
                <Form.Item label={lang.payment.payment_form.label.phone}>
                    {getFieldDecorator('phone', {
                        initialValue: props.info ? props.info.phone: null,
                        rules: [
                            {
                                min: 10,
                                max: 11,
                                message: lang.payment.payment_form.validate.maxPhone
                            },
                            {
                                required: true,
                                message: lang.payment.payment_form.validate.phone
                            }
                        ]
                    })(
                        <Input
                            type='number'
                            name='phone'
                            placeholder={lang.payment.payment_form.placeholder.phone}
                        />
                    )}
                </Form.Item>
                <Form.Item label={lang.payment.payment_form.label.address}>
                    {getFieldDecorator('address', {
                        initialValue: props.info ? props.info.address: null,
                        rules: [
                            {
                                max: 100,
                                message: lang.payment.payment_form.validate.maxAddress
                            },
                            {
                                required: true,
                                message: lang.payment.payment_form.validate.address
                            }
                        ]
                    })(
                        <Input
                            type='text'
                            name='address'
                            placeholder={lang.payment.payment_form.placeholder.address}
                        />
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button className='btn-update' type='primary' htmlType='submit'>
                        {lang.payment.update}
                    </Button>
                    {props.info.userName?
                    <Button className='btn-cancel' onClick={props.onCancelUpdate}>
                        {lang.payment.cancel}
                    </Button>:null}
                </Form.Item>
            </Form>
        </div>
    )
}

export default Form.create({ name: 'form' })(PaymentForm)
