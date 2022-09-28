import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
})
export class CartTableComponent implements OnInit {
  @Input() updatable: boolean = false;

  @Output() onCartUpdate = new EventEmitter<CartItem[]>();

  items: CartItem[] = [];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.getCart().subscribe((items) => {
      this.items = items;
      this.onCartUpdate.emit(this.items);
    });
  }

  get total() {
    let total = 0;
    for (let item of this.items) {
      total = total + item.product!.cost * item.qty;
    }
    return total;
  }

  qtyAsNumber(item: CartItem) {
    item.qty = +item.qty;
  }

  updateCart(item: CartItem) {
    this.cart.updateCart(item).subscribe((items) => {
      alert('Cart Updated');
      this.items = items.map((updated) => {
        const it = this.items.find((it) => updated.id === it.id);
        updated.product = it!.product;
        return updated;
      });
      this.onCartUpdate.emit(this.items);
    });
  }
}
