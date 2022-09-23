import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILS } from '../Constants/UserConstants'

export const UserLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/login", { email, password }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message,});

    }
}

export const UserDetailsAction = () => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const token = localStorage.getItem("userInfo")
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
        const { data } = await axios.get("/profile", config)
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}