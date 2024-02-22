import {createSelector} from "@ngrx/store";
import {productFeatureReducer} from "./product.reducer";
import {selectRouterParam} from "../../router/router.selectors";

export const selectProducts = createSelector(
  productFeatureReducer.selectProductState, // automatically created for us in the reducer
  (state) => state.products
);

export const selectIsPageOpen = createSelector(productFeatureReducer.selectProductState, (state) => state.isPageOpen);

export const selectCurrentProductId = selectRouterParam('productId');
export const selectCurrentProduct = createSelector(
  selectProducts,
  selectCurrentProductId,
  (products, productId) => products && productId ?
    products.find((product) => product.id === productId)
    : undefined
);
