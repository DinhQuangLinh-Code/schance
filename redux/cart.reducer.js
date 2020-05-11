import storeAction from './actions'
    

    const showTotalAmount = _ => {   
        var result = 0
        if(process.browser){
            result = JSON.parse(localStorage.getItem('cart'))      
        }
        return result
    }
    var quantity = showTotalAmount()

    const initialState = {
        data:  quantity ? quantity : [],
        total: 0
    }
    
 
    const cart = (state = initialState, action) => {
        switch (action.type) {
            case storeAction.CART_ADD:
                let { data } = state            
                let idx = data.findIndex(x => x.cart === action.payload.cart)
                if (idx !== -1) {
                    data[idx].quantity += action.payload.quantity
                } else {
                    data.push(action.payload)
                }
                state.total += action.payload.quantity              
                localStorage.setItem('cart', JSON.stringify(state.data))
                return Object.assign({}, state)
            case storeAction.CARD_UPDATE:
                var index = state.data.findIndex(x => x.cart === action.payload.cart)
                if (index !== -1) {
                    state.data[index].quantity = action.payload.quantity
                }
                localStorage.setItem('cart', JSON.stringify(state.data))
                return Object.assign({}, state)
            case storeAction.CARD_REMOVE:
                var index = state.data.findIndex(x => x.cart === action.payload.cart)
                if (index !== -1) {
                    state.data.splice(index, 1)
                }
                return Object.assign({}, state)
            default:
                break
        }
        return state
    }
    
    export default cart


