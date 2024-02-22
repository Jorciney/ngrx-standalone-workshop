import {createFeature, createReducer, on} from "@ngrx/store";
import * as productActions from "./actions";
import {ProductModel} from "../../model/product";
import {data} from "@angular-monorepo/mock-data";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LoadingStatus, RequestStatus} from "../../shared/request-status";

export interface ProductState {
  isPageOpen: boolean;
  products: EntityState<ProductModel>;
  error: string | undefined;
  productsRequestStatus: RequestStatus
}

export const productAdapter: EntityAdapter<ProductModel> = createEntityAdapter({
  selectId: (product: ProductModel) => product.id
});

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  isPageOpen: false,
  error: undefined,
  productsRequestStatus: LoadingStatus.IDLE
};

export const productFeatureReducer = createFeature({
  name: 'product',
  reducer: createReducer(initState,
    on(productActions.pageIsOpened, state => {
      return ({
        ...state,
        products: productAdapter.upsertMany(data, state.products),
        productsRequestStatus: LoadingStatus.LOADING,
        isPageOpen: true
      })
    }),
    on(productActions.productApiActions.productFetchedSuccess, (state, {products}) => {
        return ({
          ...state,
          products: productAdapter.upsertMany(products, state.products),
          productsRequestStatus: LoadingStatus.FULLFILLED
        })
      }
    ),
    on(productActions.productApiActions.productFetchedError, (state, {error}) => ({
        ...state,
        products: productAdapter.removeAll(state.products),
        error,
      productsRequestStatus: {error}
      })
    ),
    on(productActions.productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      return {
        ...state,
        products: productAdapter.upsertOne(product, state.products),
        productsRequestStatus: LoadingStatus.FULLFILLED
      };
    })
  )
});
