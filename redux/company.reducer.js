import storeAction from './actions'

const initialState = {
    data: []
}

const company = (state = initialState, action) => {
    switch (action.type) {
        case storeAction.COMPANY_INIT:
            state.data = action.payload
            return Object.assign({}, state)
        default:
            break
    }
    return state
}

export default company
