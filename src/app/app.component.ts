import { Component } from '@angular/core';
import { Collection } from './interfaces/collection';
import { Product } from './interfaces/product';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
  }
}
