import { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import { Dropdown, Menu } from 'antd'
import loginService from '../../services/login-service'
import { useDispatch, useSelector } from 'react-redux'
import {notification } from 'antd'
import Link from 'next/link'
import { relativeTimeRounding } from 'moment'

const menu = lang => (
    <Menu>
        <Menu.Item>
            <Link href='/don-hang'><a className='btn item-menu'>{lang.lang.login.order}</a></Link>
        </Menu.Item>
        <Menu.Item>
            <Link href='/quyen-gop'><a className='btn item-menu'>{lang.lang.login.donate}</a></Link>
        </Menu.Item>
        <Menu.Item
            key='0'
            onClick={() => {
                localStorage.removeItem('auth')
                localStorage.removeItem('token')
                location.href = '/'
            }}>
            <a className='btn item-menu'>{lang.lang.logOut}</a>
        </Menu.Item>
    </Menu>
)

const userLogged = (user, lang) => (
    <div className='login'>
        <Dropdown overlay={menu(lang)} trigger={['click']} placement='bottomLeft'>
            {user && (
                <img
                    className='images-user'
                    src={user.picture.data.url}
                    alt={user.picture.data.url}
                />
            )}
        </Dropdown>
        <p>{user ? user.name : ''}</p>
    </div>
)

const Login = lang => {
    const [state, setState] = useState({
        dataLogin :[]
    })

    // Get state from Redux
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()

    useEffect(() => {
        if (process.browser) {
            setState(s =>({...s,
                user: JSON.parse(localStorage.getItem('auth'))
            }))
        }
    }, [])
    const facebookResponse = resp => {
        if(resp.status !== 'unknown'){
        localStorage.setItem('auth', JSON.stringify(resp))
        setState(s =>({...s, user: resp }))
        const param = {
            // userID:resp.userID,
            name:resp.name,
            fbId: resp.id
        }
        loginService
        .login(resp.accessToken, param)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            if (res.status === 0) {
                const args = {
                    message: (
                        <div className='add-to-cart'>
                            <p className='text'>
                                <i className='fas fa-check-circle'></i>
                                {lang.lang.login.messegeLogin}
                            </p>
                        </div>
                    ),
                    duration: 1.5,
                    top: 100,
                    right: 50
                }
                notification.open(args)
            }
        })
        .catch(err => console.log(err))
        if(location.pathname === '/thanh-toan'){
            setTimeout(() => {
            location.reload()}, 600)
        }
    }
    }

    return (
        <div className='bgr-login'>
            {!state.user && (
                <div>
                    <FacebookLogin
                        appId='117541048849059'
                        fields='name,email,picture'
                        cookie={true}
                        callback={facebookResponse}
                        textButton={<p>Đăng nhập</p>}
                        icon={<i className="fab fa-facebook-square" />}
                    />
                </div>
            )}
            {state.user && userLogged(state.user , lang)}
        </div>
    )
}

export default Login
