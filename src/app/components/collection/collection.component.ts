import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Collection } from 'src/app/interfaces/collection';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  colName = 'Nome-Collezione'
  collection_id?: number;
  products?: Product[];

  constructor(private productServices: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe((params: Params) => {
        this.collection_id = params['collection_id'];

        this.productServices.getProductsFromCollection(this.collection_id).subscribe((res)=> {
          this.products = res.products;
        })
      });
  }

  getProductFromCollection(collection_id:number) {
    this.productServices.getProductsFromCollection(collection_id).subscribe((res)=> {
      this.products = res.products;
    })
  }

  // redirect to product page
  goToProduct(product_id:number) {
    this.router.navigate(['/collection', this.collection_id, product_id]);
  }
}
