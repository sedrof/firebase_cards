
import {
    CART_ITEMS_FULL,
    CART_ITEMS_EMPTY
} from './types';


export const load_all_cards = (selectionModel) => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: CART_ITEMS_FULL,
            payload: selectionModel
        });
    } else {
        dispatch({
            type: CART_ITEMS_EMPTY
        });
    }
};
