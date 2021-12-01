import axios from 'axios';

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CLEAR_ITEMS } from '../constants/cartConstants';

/**
 * Adds a product to the cart
 *
 * @param  int id  The product id
 * @param  int qty The quantity of the product
 *
 * @return         The product data
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

/**
 * Removes a product from cart by product_id
 *
 * @param  int id The product id
 *
 * @return        The product id that has been removed from the cart
 */
export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

/**
 * Removes all the items from the user's cart
 *
 * @return void
 */
export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
    payload: []
  });

  localStorage.setItem('cartItems', JSON.stringify([]));
};
