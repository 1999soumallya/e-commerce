import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILS } from "../Constants/ProductConstants"

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}