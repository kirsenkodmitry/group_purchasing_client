import { Routes } from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {CartComponent} from './cart/cart.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent }
];
