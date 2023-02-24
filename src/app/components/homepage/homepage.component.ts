import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Collection } from 'src/app/interfaces/collection';
import { CollectionListing } from 'src/app/interfaces/collection_listing';
import { Product } from 'src/app/interfaces/product';
import { ProductListing } from 'src/app/interfaces/product_listing';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  collectionsProducts:[number, Product[]][] = [];

  constructor(private productServices: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
      // get collections
      this.productServices.getCollections().subscribe((res: CollectionListing) => {
        let collections: Collection[];
        collections = res.collection_listings;

        // get first five products from collections
        collections.forEach((collection:Collection) => {
          this.productServices.getProductsFromCollection(collection.collection_id, 5).subscribe((res:ProductListing) => {
            let coll_id = collection.collection_id;
            this.collectionsProducts.push([coll_id, res.products as Product[]]);
          });
        });

      }); 
  }

  // redirect to product page
  goToProduct(product_id:number) {
    // this.router.navigate(['/collection', this.collection_id, product_id]);
  }
}
