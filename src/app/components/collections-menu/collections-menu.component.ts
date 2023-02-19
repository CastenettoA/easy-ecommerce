import { Component } from '@angular/core';
import { Collection } from 'src/app/interfaces/collection';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-collections-menu',
  templateUrl: './collections-menu.component.html',
  styleUrls: ['./collections-menu.component.scss']
})
export class CollectionsMenuComponent {
  collections?: Collection[];
  collection_id?: Collection["collection_id"];
  products?: Product[];

  constructor(private productServices: ProductService) {
    // this.productServices.getCollections().subscribe((res) => {
    //   this.collections = res.collection_listings;
    // });
  }

  // loadProduct(current_col: Collection) {
  //   if (current_col.collection_id && this.collections) {
  //     let collection = this.collections.find(col => col.collection_id == current_col.collection_id);

  //     // if collection exist
  //     if (collection) {
  //       this.productServices.getProductsFromCollection(collection.collection_id).subscribe((res) => {
  //         this.products = res.products;
  //       });
  //     }
  //   }
  // }

  updateCollection(collection_id:number) {
    // call a service that update the CollectionComponent
  }

}
