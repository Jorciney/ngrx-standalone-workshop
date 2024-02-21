import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs";
import * as productActions from './actions';

export const handleFetchError = createEffect((actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(productActions.productApiActions.productFetchedError),
      tap(({error}) => {
        console.log('ON eerrorr Error', error);
        snackBar.open(error, 'Dismiss', {duration: 2500});
      })
    )
  }, {dispatch: false, functional: true}
)
