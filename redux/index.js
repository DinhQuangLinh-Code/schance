import { combineReducers } from 'redux'

import cart from './cart.reducer'
import product from './product.reducer'
import company from './company.reducer'

const rootReducer = combineReducers({
    cart,
    product,
    company
})
export default rootReducer
