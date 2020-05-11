import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buildCompanyImageForProduct, isObjectEmpty } from '../configurations/common'
import productService from '../services/product-service'
import storeAction from '../redux/actions'
import companyService from '../services/company-service'
import ProductContainer from '../components/container/product/product-container'
import ProductSearch from '../components/container/product/product-search'
import ProductBreadcrumb from '../components/container/product/product-breadcrumb'
import PageLoading from '../components/shared/page-loading'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'

const Product = props => {
    // Get state from Redux
    const product = useSelector(state => state.product)
    const company = useSelector(state => state.company)
    const dispatch = useDispatch()
    const router = useRouter()

    const [state, setState] = useState({
        loading: true,
        products: [],
        companies: [],
        companySelected: 'all'
    })

    useEffect(() => {
        Router.events.on('routeChangeComplete', props => {
            const indexOfQuery = props.indexOf('?cid=')
            if (indexOfQuery !== -1) {
                const id = props.replace('?cid=', '').substring(indexOfQuery, props.length)
                dispatch({ type: storeAction.COMPANY_CHANGE, payload: id })
            } else {
                dispatch({ type: storeAction.COMPANY_CHANGE, payload: 'all' })
            }
        })
    }, [Router])

    useEffect(() => {
        if (product.companyId) {
            onFilterProduct(product.companyId, true)
        }
    }, [product])

    useEffect(() => {
        async function fetchData() {
            const companyResp =
                company.data.length > 0 ? company : await companyService.getCompanies()
            const productResp =
                product.data.length > 0 ? product : await productService.getProducts()
            if (product.data.length === 0) {
                dispatch({ type: storeAction.PRODUCT_INIT, payload: productResp.data })
            }
            if (company.data.length === 0) {
                dispatch({ type: storeAction.COMPANY_INIT, payload: companyResp.data })
            }
            if (!isObjectEmpty(props.query) && props.query.cid) {
                var productFilter = productResp.data.filter(
                    x => (x.company ? x.company.id : null) === props.query.cid
                )
            } else {
                var productFilter = product.data
            }
            setState(s => ({
                ...s,
                products: buildCompanyImageForProduct(companyResp.data, productFilter),
                companies: companyResp.data,
                loading: false
            }))
        }
        if (state.loading) {
            fetchData()
        }
    }, [])

    const onFilterProduct = (id, option) => {
        let { companySelected } = state
        let products = product.data
        if (id === 'all') {
            products = product.data
            companySelected = 'all'
            if (typeof option === 'object') {
                router.push('/san-pham', '/san-pham', {})
            }
        } else {
            products = product.data.filter(x => (x.company ? x.company.id : null) === id)
            const find = state.companies.find(x => x._id === id)
            companySelected = find ? find._id : 'all'
            if (typeof option === 'object') {
                router.push({ pathname: '/san-pham', query: { cid: id } })
            }
        }
        setState(s => ({
            ...s,
            companySelected,
            products: buildCompanyImageForProduct(state.companies, products)
        }))
    }

    if (state.loading) {
        return <PageLoading />
    }

    const companySelected = state.companySelected || 'all'
    return (
        <Fragment>
            <Head>
                <title>Schance - Sản phẩm</title>
            </Head>
            <ProductBreadcrumb lang={props.lang} />
            <div className='filter-left container-page'>
                <ProductSearch
                    lang={props.lang}
                    defaultValue={companySelected}
                    companies={state.companies}
                    onFilterProduct={onFilterProduct}
                />
            </div>
            <div className='container-page' style={{ marginTop: '60px' }}>
                <p className='search-product'>
                    {props.lang.product.have} {state.products.length}{' '}
                    {props.lang.product.lenghtProduct}
                </p>
            </div>
            {state.products.length > 0 ? (
                <ProductContainer
                    lang={props.lang}
                    companies={state.companies}
                    products={state.products}
                />
            ) : null}
        </Fragment>
    )
}

export default Product
