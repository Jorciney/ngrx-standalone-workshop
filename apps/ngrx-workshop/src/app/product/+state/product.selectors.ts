import {createSelector} from "@ngrx/store";
import {productFeatureReducer} from "./product.reducer";

export const selectProducts = createSelector(
  productFeatureReducer.selectProductState, // automatically created for us in the reducer
  (state) => state.products
);

export const selectIsPageOpen = createSelector(productFeatureReducer.selectProductState, (state) => state.isPageOpen);
