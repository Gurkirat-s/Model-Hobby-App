import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Category } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css'],
})
export class CatalogViewComponent implements OnInit {
  categories: Category[] = [];

  constructor(private title: Title, private productApi: ProductService) {}

  ngOnInit(): void {
    this.title.setTitle('Model Hobby Shop');
    this.productApi.getCatalog().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
}
