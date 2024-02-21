import {createReducer, on} from "@ngrx/store";
import * as productActions from "./actions";
import {ProductModel} from "../../model/product";
import {data} from "@angular-monorepo/mock-data";

export interface GlobalState {
  product: ProductState
}

interface ProductState {
  isPageOpen: boolean;
  products?: ProductModel[];
  error?: string;
}

export const initialState: ProductState = {
  products: [],
  isPageOpen: false
}

export const productReducer = createReducer(initialState,
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
    products:[],
      error
    })
  )
);

