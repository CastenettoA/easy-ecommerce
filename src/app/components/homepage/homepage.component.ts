import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Collection } from 'src/app/interfaces/collection';
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
  collections:Collection[] = [];

  constructor(private productServices: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
      
      // get collections detail
      this.productServices.collections$.subscribe((res) => {

        if(res.collection_listings) { // if collections are available
          this.collections = res.collection_listings;  // save collections detail

          // get first five products from each collection
          this.collections.forEach((collection:Collection) => {
            this.productServices.getProductsFromCollection(collection.collection_id, 5).subscribe((res:ProductListing) => {
              let coll_id = collection.collection_id;
              this.collectionsProducts.push([coll_id, res.products as Product[]]);
            });
          });
        }
      });
  }

  // find collection title from id
  getCollectionTitle(collection_id:number) { 
    let collection = this.collections.find((collection:Collection) => collection.collection_id === collection_id);
    if(collection) {
      return collection.title;
    }
    return '';
  }

  getCollectionDescription(collection_id:number) { 
    let collection = this.collections.find((collection:Collection) => collection.collection_id === collection_id);
    if(collection) {
      return collection.body_html;
    }
    return '';
  }

  // redirect to product page
  goToProduct(product:Product, collection_id:number) {
    // find collection handle
    let collection = this.collections.find((collection:Collection) => collection.collection_id === collection_id);

    this.router.navigate([collection?.handle, product.handle], {
      state: { product }
    });

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
