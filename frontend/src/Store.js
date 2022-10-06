import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ProductListReducer } from './Reducers/ProductReducer'
import { SingleProductReducer } from './Reducers/SingleProductReducer'
import { CartReducer } from './Reducers/CartReducer'
import { UserLoginReducer, UserDetailsReducer, UserRegisterReducer } from './Reducers/UserReducer'

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : [];

const userDetailsFromStorage = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem('userDetails')) : [];

const cartItemsFromStorage = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : []

const reducer = combineReducers({
    productList: ProductListReducer,
    singleproduct: SingleProductReducer,
    cart: CartReducer,
    userLogin: UserLoginReducer,
    userDetails: UserDetailsReducer,
    userRegister: UserRegisterReducer,
});

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
    userDetails: { UserDetails: userDetailsFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

