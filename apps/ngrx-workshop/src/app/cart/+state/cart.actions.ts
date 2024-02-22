import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {CartItem} from "@angular-monorepo/api-interfaces";

export const productDetailsActions = createActionGroup({
  source: 'Product Details Page',
  events: {
    addToCart: props<{ productId: string }>(),
    cardAdded: props<{ productId: string }>(),
  }
})

export const timerEffectsActions = createActionGroup({
  source: 'Timer effects',
  events: {
    timerTick: emptyProps(),
    fetchCartItemsSuccess: props<{ carts: CartItem[] }>(),
    fetchCartItemsError: props<{ error: string }>(),
  }
});
export const cartDetailsActions = createActionGroup({
  source: "Cart Details Page",
  events: {
    pageOpened: emptyProps(),
    purchaseSuccess: emptyProps(),
  },
});
export const cartActions = createActionGroup({
  source: "Cart",
  events: {
    addToCartSuccess: emptyProps(),
    addToCartError: props<{ productId: string, error: string }>(),
  },
});
