import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatalogViewComponent } from './components/catalog-view/catalog-view.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { FormsModule } from '@angular/forms';
import { FinishViewComponent } from './components/finish-view/finish-view.component';
import { CheckoutViewComponent } from './components/checkout-view/checkout-view.component';
import { ShipToViewComponent } from './components/ship-to-view/ship-to-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogViewComponent,
    CategoryCardComponent,
    CategoryViewComponent,
    ProductDetailsComponent,
    CartViewComponent,
    CartTableComponent,
    FinishViewComponent,
    CheckoutViewComponent,
    ShipToViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'catalog', component: CatalogViewComponent },
      { path: 'category/:catId', component: CategoryViewComponent },
      { path: 'products/:prodId', component: CategoryViewComponent },
      { path: 'cart', component: CartViewComponent },
      { path: 'shipTo', component: ShipToViewComponent },
      { path: 'checkout', component: CheckoutViewComponent },
      { path: 'finish', component: FinishViewComponent },
      { path: '', pathMatch: 'full', redirectTo: '/catalog' },
      { path: '**', pathMatch: 'full', redirectTo: '/catalog' },
    ]),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
