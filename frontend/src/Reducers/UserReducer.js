import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILS, USER_LOGOUT, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILS, USER_DETAILS_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILS, USER_SAVEADDRESS_REQUEST, USER_SAVEADDRESS_SUCCESS, USER_SAVEADDRESS_FAILS, USER_GETADDRESS_REQUEST, USER_GETADDRESS_SUCCESS, USER_GETADDRESS_FAILS } from '../Constants/UserConstants'

export const UserRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAILS:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

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

export const UserDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAILS:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
}

export const UserUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true, ...state }

        case USER_UPDATE_SUCCESS:
            return { loading: false, succcess: true, userInfo: action.payload }

        case USER_UPDATE_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const UserSaveAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SAVEADDRESS_REQUEST:
            return { loading: true, ...state }

        case USER_SAVEADDRESS_SUCCESS:
            return { loading: false, succcess: true, saveAddress: action.payload }

        case USER_SAVEADDRESS_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const UserGetAddressReducer = (state = {getAddress: []}, action) => {
    switch (action.type) {
        case USER_GETADDRESS_REQUEST:
            return { loading: true, ...state }

        case USER_GETADDRESS_SUCCESS:
            return { loading: false, getAddress: action.payload }

        case USER_GETADDRESS_FAILS:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}