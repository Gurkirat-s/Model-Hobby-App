import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, zip } from 'rxjs';

import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { Shipping } from '../models/shipping.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private productApi: ProductService) {}

  getCartItem() {
    return this.http.get<CartItem[]>('/api/cart');
  }

  checkoutCart(shippingInfo?: Shipping) {
    const url = '/api/cart/checkout';
    console.log('checkout in cart clicked');

    if (shippingInfo as Shipping) {
      console.log(shippingInfo);
      this.http.post<Shipping>(url, shippingInfo).subscribe((data) => {});
    }
  }

  getCart() {
    return new Observable<CartItem[]>((subscriber) => {
      this.getCartItem().subscribe((items) => {
        zip(
          items.map((item) => this.productApi.getProductById(item.id))
        ).subscribe((products) => {
          subscriber.next(
            items.map((item, i) => {
              item.product = products[i];
              return item;
            })
          );
          subscriber.complete();
        });
      });
    });
  }

  updateCart(item: CartItem | Product, qty?: number): Observable<CartItem[]> {
    const url = '/api/cart/update';
    if ((item as Product).name) {
      return this.http.post<CartItem[]>(url, { id: item.id, qty: qty ?? 1 });
    } else {
      return this.http.post<CartItem[]>(url, {
        id: item.id,
        qty: qty ?? item.qty,
      });
    }
  }

  addToCart(product: Product, qty: number = 1) {
    return new Observable<CartItem[]>((subscriber) => {
      this.getCartItem().subscribe((items) => {
        const item = items.find((it) => it.id === product.id);
        const updater = this.updateCart(
          item ?? product,
          item ? item.qty + qty : qty
        );
        updater.subscribe((updated) => {
          subscriber.next(updated);
          subscriber.complete();
        });
      });
    });
  }
}
