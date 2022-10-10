import { PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAILS } from '../Constants/ProductConstants'

export const SingleProductReducer = (state = { SingleProduct: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, SingleProduct: action.payload };

        case PRODUCT_DETAILS_FAILS:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}