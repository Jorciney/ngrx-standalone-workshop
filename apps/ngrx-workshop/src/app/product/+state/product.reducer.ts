import {createReducer, on} from "@ngrx/store";
import {pageIsOpenedAction} from "./actions";
import {ProductModel} from "../../model/product";
import {data} from "@angular-monorepo/mock-data";

export interface GlobalState {
  product: ProductState
}

interface ProductState {
  isPageOpen: boolean;
  products?: ProductModel[];
}

export const initialState: ProductState = {
  products: [],
  isPageOpen: false
}

export const productReducer = createReducer(initialState,
  on(pageIsOpenedAction, state => {
    return ({
      ...state,
      products: [...data],
      isPageOpen: true
    })
  }));

