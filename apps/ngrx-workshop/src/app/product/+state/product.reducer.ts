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
    ),
    on(productActions.productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      const productsClone = state.products ? [...state.products] : [];
      const indexOfProduct = productsClone.findIndex(
        (p) => p.id === product.id
      );
      // Remove old one and replace with a single product fetched
      if (indexOfProduct < 0) {
        productsClone.push(product);
      } else {
        productsClone.splice(indexOfProduct, 1, product);
      }
      return {
        ...state,
        products: productsClone,
      };
    })
  )
});
