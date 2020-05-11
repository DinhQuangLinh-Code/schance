import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/shared/banner'
import About from '../components/shared/about'
import ProductContainer from '../components/container/product/product-container'
import projectService from '../services/project-service'
import productService from '../services/product-service'
import companyService from '../services/company-service'
import Company from '../components/shared/company'
import storeAction from '../redux/actions'
import ProductSearch from '../components/container/product/product-search'
import { buildCompanyImageForProduct } from '../configurations/common'
import Head from 'next/head'
import Project from '../components/shared/project'

const Index = props => {
    const product = useSelector(state => state.product)
    const company = useSelector(state => state.company)

    const [state, setState] = useState({
        projects: null,
        products: product.data || null,
        companies: null,
        companySelected: 'all'
    })

    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            let projectResp = await projectService.getProjects()
            let companyResp =
                company.data.length > 0 ? company : await companyService.getCompanies()
            let productResp = product.data.length > 0 ? product : await productService.getProducts()
            if (product.data.length === 0) {
                dispatch({ type: storeAction.PRODUCT_INIT, payload: productResp.data })
            }
            if (company.data.length === 0) {
                dispatch({ type: storeAction.COMPANY_INIT, payload: companyResp.data })
            }
            var productFilter = productResp.data.filter(x => x.isFirst === true)
            setState(s =>({...s,
                projects: projectResp.data,
                products: buildCompanyImageForProduct(companyResp.data, productFilter),
                companies: companyResp.data
            }))
        }
        fetchData()
    }, [])

    const onFilterProduct = id => {
        let { companySelected } = state
        var products = product.data
        if (id === 'all') {
            products = product.data.filter(x => x.isFirst === true)
            companySelected = 'all'
        } else {
            products = product.data.filter(x => (x.company ? x.company.id === id : null))
            const find = state.companies.find(x => x._id === id)
            companySelected = find ? find._id : 'all'
        }
        setState(s =>({...s,
            companySelected,
            projects: state.projects,
            products: buildCompanyImageForProduct(state.companies, products),
            companies: state.companies
        }))
    }

    const companySelected = state.companySelected || 'all'

    return (
        <Fragment>
            <div  className='header-right'>
            <Head>
                <title>Schance</title>
            </Head>
            <Banner lang={props.lang} />
            {state.projects && <About lang={props.lang} projects={state.projects} />}
            {state.companies && state.products && (
                <Fragment>
                    <div className='container-page' style={{ paddingTop: '30px' }}>
                        <div className='box-filter'>
                            <ProductSearch
                                lang={props.lang}
                                defaultValue={companySelected}
                                companies={state.companies}
                                onFilterProduct={onFilterProduct}
                            />
                        </div>
                    </div>
                    <ProductContainer
                        lang={props.lang}
                        companies={state.companies}
                        products={state.products}
                        header={true}
                    />

                    <Company lang={props.lang} companies={state.companies} />
                    <Project lang={props.lang} projects={state.projects}></Project>
                </Fragment>
            )}
            </div>
        </Fragment>
    )
}
export default Index
