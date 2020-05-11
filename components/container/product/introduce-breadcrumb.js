import Link from 'next/link'
const IntroduceBreadcrumb = lang => {
    return (
        <div className='breadcrumb-wrap'>
            <div className='container-page'>
                <ul className='breadcrumb'>
                    <li>
                        <Link href='/'>
                            <a>{lang.lang.home}</a>
                        </Link>
                    </li>
                    <li>
                        /<span className='cursor'>{lang.lang.menu.introduce}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default IntroduceBreadcrumb
