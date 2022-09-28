import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
})
export class CategoryViewComponent implements OnInit {
  category!: Category;
  products: Product[] = [];

  @Output() selected!: Product;

  constructor(
    private title: Title,
    private productApi: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('catId')) {
        this.showCategory(+params.get('catId')!);
      } else if (params.has('prodId')) {
        this.showProduct(params.get('prodId')!);
        console.log('showing Product Details');
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  showCategory(catId: number) {
    this.productApi.getCategoryById(catId).subscribe({
      next: (category) => {
        this.category = category;
        this.title.setTitle(this.selected ? this.selected.name : category.name);
        this.productApi.getProductsByCategory(catId).subscribe((products) => {
          this.products = products;
        });
      },
      error: (error) => {
        this.router.navigate(['/']);
      },
    });
  }

  showProduct(productId: string) {
    this.productApi.getProductById(productId).subscribe({
      next: (product) => {
        this.selected = product;
        this.showCategory(product.catId);
      },
      error: (error) => {
        this.router.navigate(['/']);
      },
    });
  }
}
