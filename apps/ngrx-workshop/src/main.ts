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
import {CART_FEATURE_KEY, cardReducer} from "./app/cart/+state/cart.reducer";
import * as cartEffects from "./app/cart/+state/cart.effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimations(),
    provideStore({product: productReducer}),
    provideState(CART_FEATURE_KEY,cardReducer ),
    provideEffects(ProductEffects, handleFetchError, cartEffects),
    provideStoreDevtools()],
});
