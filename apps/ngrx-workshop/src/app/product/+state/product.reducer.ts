import {createFeature, createReducer, on} from "@ngrx/store";
import * as productActions from "./actions";
import {ProductModel} from "../../model/product";
import {data} from "@angular-monorepo/mock-data";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

export interface ProductState {
  isPageOpen: boolean;
  products: EntityState<ProductModel>;
  error: string | undefined;
}

export const productAdapter: EntityAdapter<ProductModel> = createEntityAdapter({
  selectId: (product: ProductModel) => product.id
});

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  isPageOpen: false,
  error: undefined
};

export const productFeatureReducer = createFeature({
  name: 'product',
  reducer: createReducer(initState,
    on(productActions.pageIsOpened, state => {
      return ({
        ...state,
        products: productAdapter.upsertMany(data, state.products),
        isPageOpen: true
      })
    }),
    on(productActions.productApiActions.productFetchedSuccess, (state, {products}) => {
        return ({
          ...state,
          products: productAdapter.upsertMany(products, state.products),
        })
      }
    ),
    on(productActions.productApiActions.productFetchedError, (state, {error}) => ({
        ...state,
        products: productAdapter.removeAll(state.products),
        error
      })
    ),
    on(productActions.productApiActions.singleProductFetchedSuccess, (state, { product }) => {
      return {
        ...state,
        products: productAdapter.upsertOne(product, state.products),
      };
    })
  )
});
