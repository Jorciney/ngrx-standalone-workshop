import {createSelector} from "@ngrx/store";
import {productAdapter, productFeatureReducer} from "./product.reducer";
import {selectRouterParam} from "../../router/router.selectors";


const {selectAll, selectEntities} = productAdapter.getSelectors();
export const selectProducts = createSelector(
  productFeatureReducer.selectProducts, // automatically created for us in the reducer
  selectAll
);
const selectProductsDictionary = createSelector(
  productFeatureReducer.selectProducts,
  selectEntities
);

export const selectIsPageOpen = createSelector(productFeatureReducer.selectProductState, (state) => state.isPageOpen);
export const selectCurrentProductId = selectRouterParam('productId');
export const selectCurrentProduct = createSelector(
  selectProductsDictionary,
  selectCurrentProductId,
  (products, productId) => {
    if (!(products && productId)) {
      return undefined;
    }
    return products[productId];
  }
);
