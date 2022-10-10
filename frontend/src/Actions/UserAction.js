import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILS, USER_LOGOUT, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILS } from '../Constants/UserConstants'


export const UserRegister = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = { headers: { "Content-type": "application/json" } };
        const { data } = await axios.post("/", { name, email, password }, config);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const UserLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/login", { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });

    }
}

export const UserLogout = () => async (dispatch) => {
    localStorage.removeItem("userDetails")
    localStorage.removeItem("userInfo");

    dispatch({ type: USER_LOGOUT });
}

export const UserDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}` } }
        const { data } = await axios.get(`/profile/`, config)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}