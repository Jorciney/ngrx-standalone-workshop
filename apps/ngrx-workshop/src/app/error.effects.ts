import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs";
import {productApiActions} from "./product/+state/actions";
import {cartActions} from "./cart/+state/cart.actions";

export const handleFetchError = createEffect((actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(productApiActions.productFetchedError),
      tap(({error}) => {
        snackBar.open(error, 'Dismiss', {duration: 2500});
      })
    )
  }, {dispatch: false, functional: true}
)

export const handleAddToCartError = createEffect((actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(cartActions.addToCartError),
      tap(({error}) => {
        snackBar.open(error, 'ERROR addCartErrro', {duration: 2500});
      })
    )
  }, {dispatch: false, functional: true}
)
