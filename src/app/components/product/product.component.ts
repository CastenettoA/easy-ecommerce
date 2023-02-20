import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  collection_id?: number;
  product_id?: number;
  product?: any;


  constructor(private productServices: ProductService,
    private route: ActivatedRoute) {
      this.route.params.subscribe((params: Params) => {
        this.collection_id = params['collection_id'];
        this.product_id = params['product_id'];

        this.productServices.getProductDetails(this.product_id).subscribe((res)=> {
          this.product = res.product;
        })
      });
  }
}
