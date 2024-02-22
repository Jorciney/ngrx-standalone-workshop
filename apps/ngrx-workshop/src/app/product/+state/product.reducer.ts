import {createFeature, createReducer, on} from "@ngrx/store";
import * as productActions from "./actions";
import {ProductModel} from "../../model/product";
import {data} from "@angular-monorepo/mock-data";

export interface ProductState {
  isPageOpen: boolean;
  products: ProductModel[] | undefined;
  error: string | undefined;
}

const initState: ProductState = {
  products: undefined,
  isPageOpen: false,
  error: undefined
};


export const productFeatureReducer = createFeature({
  name: 'product',
  reducer: createReducer(initState,
    on(productActions.pageIsOpened, state => {
      return ({
        ...state,
        products: [...data],
        isPageOpen: true
      })
    }),
    on(productActions.productApiActions.productFetchedSuccess, (state, {products}) => {
        return ({
          ...state,
          products
        })
      }
    ),
    on(productActions.productApiActions.productFetchedError, (state, {error}) => ({
        ...state,
        products: [],
        error
      })
    )
  )
});
