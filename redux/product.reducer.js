import storeAction from './actions'

const initialState = {
    data: [],
    companyId: null
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case storeAction.PRODUCT_INIT:
            state.data = action.payload
            return Object.assign({}, state)
        case storeAction.PRODUCT_FILTER:
            state.data = action.payload
            return Object.assign({}, state)
        case storeAction.COMPANY_CHANGE:
            state.companyId = action.payload
            return Object.assign({}, state)
        default:
            break
    }
    return state
}

export default product
