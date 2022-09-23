import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILS, USER_LOGOUT, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILS } from '../Constants/UserConstants'

export const UserLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
    
        case USER_LOGIN_FAILS:
            return { loading: false, error: action.payload };
        
        case USER_LOGOUT:
            return {};
        
        default:
            return state;
    }
} 

export const UserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        
        case USER_DETAILS_SUCCESS:
            return { loading: false, UserDetails: action.payload };
        
        case USER_DETAILS_FAILS:
            return { loading: false, error: action.payload };
    
        default:
            return state;
    }
}