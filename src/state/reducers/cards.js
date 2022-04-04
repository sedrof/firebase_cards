import {
    LOGOUT,
    CART_ITEMS_FULL,
    CART_ITEMS_EMPTY,
    LOGIN_FAIL,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL

} from '../actions/types';

import { CartProvider, useCart } from "react-use-cart";

const initialState = {

    cart: localStorage.getItem('cart'),
};


export default function reducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case     CART_ITEMS_FULL:
            return {
                cart: localStorage.setItem('cart', JSON.stringify(payload)),
            }

        case     CART_ITEMS_EMPTY:
        case     LOGOUT:
        case     LOGIN_FAIL:
        case     USER_LOADED_FAIL:
        case     AUTHENTICATED_FAIL:
            localStorage.removeItem('cart')
            return {
                ...state,
                cart:null
            }
        default:
            return state
    }



}