import {inject, Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {ProductService} from "../product.service";
import * as productActions from './actions';
import {productApiActions} from './actions';
import {catchError, exhaustMap, filter, map, of, switchMap} from "rxjs";
import {selectCurrentProductId} from "./product.selectors";
import {Store} from "@ngrx/store";

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly productService = inject(ProductService);


  fetchCurrentproduct$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(productActions.productDetailsActions.pageOpened),
        concatLatestFrom(() => this.store.select(selectCurrentProductId).pipe(
            filter((id): id is string => !!id),
          )
        ),
        switchMap(([, id]) =>
          this.productService.getProduct(id).pipe(
            map((product) =>
              productApiActions.singleProductFetchedSuccess({product})
            ),
            catchError(() =>
              of(
                productApiActions.singleProductFetchedError({
                  error: "Error Fetching Single Product",
                })
              )
            )
          )
        )
      )
    }
  );
  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.pageIsOpened),
      exhaustMap(() => this.productService.getProducts().pipe(
        map(products => productActions.productApiActions.productFetchedSuccess({products})),
        catchError(() => of(productActions.productApiActions.productFetchedError({error: 'Something went wrong!'}))),
      )),
    )
  });
}
