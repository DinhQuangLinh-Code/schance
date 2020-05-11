import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import lang from '../i18n/lang-vn.json'
import withRedux from '../lib/with-redux'
import '../components/styles/antd.scss'
import '../components/styles/main.scss'
import '../components/styles/responsive.scss'

class MyApp extends App {
    render() {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Provider store={reduxStore}>
                <div id='wrapper' className='app'>
                    <div id='content-wrapper' className='d-flex flex-column'>
                        <div id='content' className='d-flex flex-column site-wrapper'>
                            <Header {...lang} />
                            <div className='site-page'>
                                <Component
                                    {...pageProps}
                                    lang={lang}
                                    query={this.props.router.query}
                                />
                            </div>
                            <Footer {...lang} />
                        </div>
                    </div>
                </div>
            </Provider>
        )
    }
}

export default withRedux(MyApp)
