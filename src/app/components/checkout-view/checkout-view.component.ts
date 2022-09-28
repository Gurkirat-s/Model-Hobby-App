import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css'],
})
export class CheckoutViewComponent implements OnInit {
  constructor(
    private location: Location,
    private shipping: ShippingService,
    private title: Title,
    private router: Router,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Checkout');
    if (!this.shipping.shippingAddress) {
      this.router.navigate(['/shipTo', { replaceUrl: true }]);
    }
  }

  get shippingAddress() {
    return this.shipping.shippingAddress;
  }

  deleteCart() {
    console.log('Clicked Checkout');
    this.cart.checkoutCart(this.shippingAddress);
  }

  goBack() {
    this.location.back();
  }
}
