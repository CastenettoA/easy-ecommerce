import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product?: any;

  constructor(private productServices: ProductService,
    private route: ActivatedRoute, private router: Router) {
      let state:any = this.router.getCurrentNavigation()?.extras.state;
      this.product = state.product;
  }

  loadProduct() {

  }
}
