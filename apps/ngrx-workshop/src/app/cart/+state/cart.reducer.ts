import {CartItem} from "@angular-monorepo/api-interfaces";
import {createReducer, on} from "@ngrx/store";
import {cartActions, productDetailsActions, timerEffectsActions} from "./cart.actions";

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: []
};

export const cardReducer = createReducer(initialState,
  on(productDetailsActions.addToCart, (state, {productId}) => {
    const cartItemsClone = state.cartItems ? [...state.cartItems] : [];
    const cartItemIndex = cartItemsClone.findIndex(
      (cartItem) => cartItem.productId === productId
    );
    if (cartItemIndex < 0) {
      cartItemsClone.push({
        productId,
        quantity: 1,
      });
    } else {
      // Replace item with an item that has updated quantity
      cartItemsClone.splice(cartItemIndex, 1, {
        productId,
        quantity: cartItemsClone[cartItemIndex].quantity + 1,
      });
    }
    return {
      ...state,
      cartItems: cartItemsClone,
    }
  }),
  on(timerEffectsActions.fetchCartItemsSuccess, (state, {carts}) => ({
      ...state,
      cartItems: [...carts]
    })
  ),
  on(cartActions.addToCartError, (state, {productId}) => {
    const cartItemsClone = state.cartItems ? [...state.cartItems] : [];
    const cartItemIndex = cartItemsClone.findIndex(
      (cartItem) => cartItem.productId === productId
    );
    if (cartItemIndex > -1) {
      // Replace item with an item that has updated quantity
      cartItemsClone.splice(cartItemIndex, 1, {
        productId,
        quantity: cartItemsClone[cartItemIndex].quantity - 1,
      });
    }
    return {...state, cartItems: cartItemsClone};
  })
);
