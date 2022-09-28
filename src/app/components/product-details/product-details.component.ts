import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private productApi: ProductService,
    private route: ActivatedRoute,
    private cartApi: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    console.log(product);
    this.cartApi.addToCart(product).subscribe(() => {
      this.router.navigate(['/']).then(() => {
        this.router.navigate(['/cart']);
      });
    });
  }
}
