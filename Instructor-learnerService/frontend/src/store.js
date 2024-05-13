import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducer'
import { placeOrderReducer, getUserOrdersReducer } from './reducers/orderReducer'
import { loginUserReducer, registerUserReducer ,addCustomerReducer } from './reducers/userReducer'
import { adminloginReducer} from './reducers/adminReducer'
import { addRefundReducer ,getAllRefundsReducer } from './reducers/refundReducer'
import { getAllStocksReducer } from './reducers/stocksReducer'

const finalReducer = combineReducers({

    cartReducer: cartReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    adminloginReducer: adminloginReducer,
    placeOrderReducer: placeOrderReducer , 
    addCustomerReducer : addCustomerReducer,
    addRefundReducer : addRefundReducer,
    getAllRefundsReducer : getAllRefundsReducer,
    getAllStocksReducer :getAllStocksReducer
    
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null
const currentNotifications = localStorage.getItem('currentNotifications') ? JSON.parse(localStorage.getItem('currentNotifications')) : null
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null


const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser,
        currentNotifications: currentNotifications,
        
    },
    adminloginReducer: {
        currentAdmin: currentAdmin,
        currentNotifications: currentNotifications,
        
    }
   
   
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store