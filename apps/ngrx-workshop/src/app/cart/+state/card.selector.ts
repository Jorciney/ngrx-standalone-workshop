import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CART_FEATURE_KEY, CartState} from "./cart.reducer";
import {selectProducts} from "../../product/+state/product.selectors";
import {CartProduct} from "../../model/product";

export const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const selectCartItems = createSelector(
  cartFeature,
  (state) => state.cartItems
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (cartItems) =>
    cartItems
      ? cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      : 0
);

export const selectCartProducts = createSelector(
  selectProducts,
  selectCartItems,
  (products, cartItems) => {
    if (!cartItems || !products) {
      return [];
    }
    return cartItems.map((cartItem): CartProduct | undefined => {
      const product = products.find((p) => p.id === cartItem.productId);
      return product
        ? {
          ...product,
          quantity: cartItem.quantity,
        }
        : undefined;
    }).filter((cartProduct): cartProduct is CartProduct => !!cartProduct);
  }
)
export const selectCartTotal = createSelector(
  selectCartProducts,
  (cartItems) =>
    cartItems &&
    cartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
);
