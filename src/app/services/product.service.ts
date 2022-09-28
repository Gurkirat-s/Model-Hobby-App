import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Category } from '../models/product.model';
import { Product } from '../models/product.model';
import { zip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getCatalog() {
    return this.http.get<Category[]>('/Catalog');
  }

  getCategoryById(id: number): Observable<Category> {
    return new Observable<Category>((subscriber) => {
      this.getCatalog().subscribe((categories) => {
        const category = categories.find((c) => c.id === id);
        if (category) {
          subscriber.next(category);
        } else {
          subscriber.error({ status: 404, statusText: 'NOT FOUND' });
        }
        subscriber.complete();
      });
    });
  }

  getProductById(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  getProductsByCategory(catId: number) {
    return this.http.get<Product[]>(`api/products/category/${catId}`);
  }

  getRecommendedProducts(): Observable<Product[]> {
    const url = '/api/products/recommended';
    console.log('Called getRecommendations');
    return new Observable<Product[]>((subscriber) => {
      this.http.get<string[]>(url).subscribe((productIds) => {
        zip(productIds.map((pid) => this.getProductById(pid))).subscribe(
          (products) => {
            subscriber.next(products);
            subscriber.complete();
          }
        );
      });
    });
  }
}
