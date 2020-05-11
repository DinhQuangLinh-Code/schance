import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class IndexDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel='icon'
                        type='image/png'
                        href='https://s3-ap-southeast-1.amazonaws.com/schance.com.vn/favicon.png'
                    />
                    <link
                        rel='stylesheet'
                        href='https://use.fontawesome.com/releases/v5.7.0/css/all.css'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
