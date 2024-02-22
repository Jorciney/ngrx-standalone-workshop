import {createAction, createActionGroup, props} from "@ngrx/store";
import {BasicProduct} from "@angular-monorepo/api-interfaces";

export const pageIsOpened = createAction('[Product Page] Opened')
export const fetchProducts = createAction('[Product Page] Fetch Products');
// export const productsFetchedSuccess = createAction('[Product Page] Products Fetched successfully', props<{products: BasicProduct[]}>());
// export const productsFetchedError = createAction('[Product Page] Products Fetch failed', props<{error: string}>());

export const productApiActions = createActionGroup({
  source: 'Product API',
  events: {
    productFetchedSuccess: props<{ products: BasicProduct[] }>(),
    productFetchedError: props<{ error: string }>()
  }
})

export const productDetailsActions = createActionGroup({
  source: 'Product Details Page',
  events: {
    addToCart: props<{ productId: string }>(),
  }
})
