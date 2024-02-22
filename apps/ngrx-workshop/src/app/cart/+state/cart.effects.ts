import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {CartService} from "../cart.service";
import {cartDetailsActions, timerEffectsActions} from "./cart.actions";
import * as productActions from "../../product/+state/actions";
import {catchError, map, of, switchMap, timer} from "rxjs";

const REFRESH_CART_ITEMS_INTERVAL = 20_000;
export const fetchCartItems = createEffect((actions$ = inject(Actions), cartService = inject(CartService)) => {
  return actions$.pipe(
    ofType(
      timerEffectsActions.timerTick,
      productActions.pageIsOpened,
      cartDetailsActions.purchaseSuccess
    ),
    switchMap(() => cartService.getCartProducts().pipe(
      map((carts) => timerEffectsActions.fetchCartItemsSuccess({carts})),
      catchError(() => of(timerEffectsActions.fetchCartItemsError({error: 'Error fetching cart items'})))
    )),
  )
}, {functional: true});

export const refreshCartItems = createEffect(() => {
  return timer(0, REFRESH_CART_ITEMS_INTERVAL).pipe(
    map(() => timerEffectsActions.timerTick()),
  )
}, {functional: true});
