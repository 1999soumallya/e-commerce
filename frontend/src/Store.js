import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ProductListReducer } from './Reducers/ProductReducer'
import { SingleProductReducer } from './Reducers/SingleProductReducer'
import { CartReducer } from './Reducers/CartReducer'
import { UserLoginReducer, UserDetailsReducer , UserRegisterReducer } from './Reducers/UserReducer'

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")): null;

const cartItemsFromStorage = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [];

const reducer = combineReducers({
    productList: ProductListReducer,
    singleproduct: SingleProductReducer,
    cart: CartReducer,
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer
});

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

