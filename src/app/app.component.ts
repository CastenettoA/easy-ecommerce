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
  collection_id?: Collection["collection_id"];
  collections?: Collection[];
  products?: Product[];

  constructor(private productServices: ProductService) {
    let coll_id = 266329686089;
    let prod_id = 6735725133897;

    // this.productServices.getProductsFromCollection(coll_id).subscribe((res) => {
    //   console.log(res);
    // });

    this.productServices.getCollections().subscribe((res) => {
      this.collections = res.collection_listings;
    });
  }

  loadProduct() {
    console.log(this.collection_id, this.collections)
    if (this.collection_id && this.collections) {
      let collection = this.collections.find(col => col.collection_id == this.collection_id);

      console.log(collection);

      // if collection exist
      if (collection) {
        this.productServices.getProductsFromCollection(collection.collection_id).subscribe((res) => {
          this.products = res.products;
        });
      }
    }
  }
}
