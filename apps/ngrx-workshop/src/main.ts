import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {routes} from "./app/router/routes";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideState, provideStore} from "@ngrx/store";
import {productReducer} from "./app/product/+state/product.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import * as handleFetchError from "./app/error.effects";
import {ProductEffects} from "./app/product/+state/product.effects";
import {cardReducer, CART_FEATURE_KEY} from "./app/cart/+state/cart.reducer";
import * as cartEffects from "./app/cart/+state/cart.effects";

import {ROUTER_FEATURE_KEY} from "./app/router/router.selectors";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimations(),
    provideStore({product: productReducer}),
    provideState(CART_FEATURE_KEY, cardReducer),
    provideEffects(ProductEffects, handleFetchError, cartEffects),
    provideState(ROUTER_FEATURE_KEY, routerReducer),
    provideRouterStore({stateKey: ROUTER_FEATURE_KEY}),
    provideStoreDevtools()],
});
