import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '.'

const initializeState = {}

export function initializeStore(preloadedState = initializeState) {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware))
}
