import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;
  @Input() isBackButton: boolean = false;
  urlTarget!: string;

  constructor() {}

  ngOnInit(): void {
    if (this.isBackButton) {
      this.urlTarget = '/';
    } else {
      this.urlTarget = '/category/' + this.category.id;
    }
  }
}
