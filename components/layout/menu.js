import Link from 'next/link'
import { useState, useEffect } from 'react'

const Menu = lang => {
    const [state, setState] = useState({
        open: false
    })

    const menuMobile = () => {
        if (state.open) {
            setState(s => ({
                ...s,
                open: false
            }))
        } else {
            setState(s => ({
                ...s,
                open: true
            }))
        }
    }

    return (
        <div className={`sc-menu ${state.open ? 'sc-menu-open' : ''}`}>
            <button className='open' onClick={menuMobile}>
                {state.open ? <i className='fas fa-times' /> : <i className='fas fa-align-left' />}
            </button>
            <ul>
                <li>
                    <Link href='/'>
                        <a>{lang.lang.menu.home}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/san-pham'>
                        <a>{lang.lang.menu.product}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/gioi-thieu'>
                        <a>{lang.lang.menu.introduce}</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu
