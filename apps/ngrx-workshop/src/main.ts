import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/router/routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import {provideStore} from "@ngrx/store";
import {productReducer} from "./app/product/+state/product.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations(), provideStore({product: productReducer}), provideStoreDevtools()],
});
