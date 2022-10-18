import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILS, USER_LOGOUT, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILS, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILS, USER_SAVEADDRESS_REQUEST, USER_SAVEADDRESS_SUCCESS, USER_SAVEADDRESS_FAILS, USER_GETADDRESS_FAILS, USER_GETADDRESS_REQUEST, USER_GETADDRESS_SUCCESS } from '../Constants/UserConstants'


export const UserRegister = (name, email, country, state, city, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = { headers: { "Contnet-Type": "application/json" } };
        const { data } = await axios.post("/", { name, email, country, state, city, password }, config);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data, });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data, });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
};

export const UserLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = { headers: { "Contnet-Type": "application/json" } };
        const { data } = await axios.post("/login", { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data, });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const UserLogout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
}

export const UserDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST, });
        const { userLogin: { userInfo }, } = getState();
        const config = { headers: { "Contnet-Type": "application/json", Authorization: `Bearer ${userInfo.token}`, }, };
        const { data } = await axios.get(`/profile/`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data, });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
};

export const UpdateUserProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const config = { headers: { "Contnet-Type": "application/json", Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.put(`/profile/`, user, config)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: USER_UPDATE_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });

    }
}

export const UserSaveAddressAction = (name, mobileNo, EmailId, pincode, locality, address_body, country, state, city, address_type) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_SAVEADDRESS_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const UserID = userInfo._id;
        const config = { headers: { "Contnet-Type": "application/json" } };
        const { data } = await axios.post("/saveAddres", { UserID, name, EmailId, mobileNo, pincode, locality, address_body, country, state, city, address_type }, config)
        dispatch({ type: USER_SAVEADDRESS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_SAVEADDRESS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const UserGetAddressAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_GETADDRESS_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const id = userInfo._id;
        const config = { headers: { "Contnet-Type": "application/json" } };
        const { data } = await axios.get(`/getAddress/${id}`, config)
        dispatch({ type: USER_GETADDRESS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_GETADDRESS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, })
    }
}