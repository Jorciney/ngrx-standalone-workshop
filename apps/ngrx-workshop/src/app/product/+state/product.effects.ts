import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductService} from "../product.service";
import * as productActions from './actions';
import {catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);

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
