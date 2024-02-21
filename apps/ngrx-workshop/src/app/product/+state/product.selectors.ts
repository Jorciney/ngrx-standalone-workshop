import {GlobalState} from "./product.reducer";

export function selectProductState(state: GlobalState) {
    return state.product;
}

export function selectProducts(state: GlobalState) {
    return state.product.products;
}

export function selectIsPageOpen(state: GlobalState) {
    return selectProductState(state).isPageOpen;
}
