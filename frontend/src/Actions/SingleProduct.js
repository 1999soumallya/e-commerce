import axios from "axios";
import { PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAILS } from "../Constants/ProductConstants";

export const singleProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/products/${id}`)
        // console.log(data);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAILS, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}