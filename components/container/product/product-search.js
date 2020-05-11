import { Select, Col } from 'antd'

const ProductSearch = props => {
    const { companies, lang, defaultValue, onFilterProduct } = props

    return (
        <Col xs={24} sm={12} md={12} lg={8}>
            <div className='product-fitter filter-product' style={{ paddingBottom: '10px' }}>
                <Select
                    value={defaultValue}
                    showSearch
                    style={{ width: 200 }}
                    placeholder={lang.product.select_placeholder}
                    optionFilterProp='children'
                    onChange={onFilterProduct}
                    key='{key}'>
                    <Select.Option value='all'>{lang.product.select_all}</Select.Option>
                    {companies.map((v, i) => (
                        <Select.Option value={v._id} key={i}>
                            {v.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </Col>
    )
}

export default ProductSearch
