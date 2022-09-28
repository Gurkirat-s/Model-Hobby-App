import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})
export class CartViewComponent implements OnInit {
  items: CartItem[] = [];
  recommendations: Product[] = [];

  constructor(
    private location: Location,
    private productApi: ProductService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Cart');
  }

  cartUpdate(items: CartItem[]) {
    this.items = items;
    // this.productApi.getRecommendedProducts().subscribe((products) => {
    //   this.recommendations = [];
    //   for (let product of products) {
    //     if (!this.items.find((items) => items.id === product.id)) {
    //       this.recommendations.push(product);
    //     }
    //   }
    // });
  }

  goBack() {
    this.location.back();
  }
}
