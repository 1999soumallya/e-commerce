import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstants";

export const cartAction = (id, Qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            Qty
        }
    })

    localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartItems));
}

export const cartRemoveAction = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM, payload:id
    })

    localStorage.setItem('cartitems', JSON.stringify(getState().cart.cartItems));
}