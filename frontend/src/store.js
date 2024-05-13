import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducer'
import { placeOrderReducer, getUserOrdersReducer } from './reducers/orderReducer'


const finalReducer = combineReducers({

    cartReducer: cartReducer,
    getUserOrdersReducer : getUserOrdersReducer,

    
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
   
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store