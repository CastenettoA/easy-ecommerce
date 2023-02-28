import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  handle?: string;

  product?: any;
  productDetail?: Product;
  price?: string;
  relatedProducts?: Product[];

  constructor(private productServices: ProductService,
    private route: ActivatedRoute, private router: Router) {

    this.onRouteChangeUpdateProduct();
    this.loadProduct();
  }

  onRouteChangeUpdateProduct() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadProduct();
      }
    })
  }

  loadProduct() {
    // get product details
    let state: any = this.router.getCurrentNavigation()?.extras.state;
    if (state && state.product) {
      this.product = state.product;

      this.productServices.getProductDetails(this.product.id).subscribe((res: { product: Product }) => {
        this.productDetail = res.product;

        if (this.productDetail.variants.length > 0) {
          this.price = this.productDetail.variants[0].price;
        }
      });

      this.handle = this.productServices.getCollectionHandle(this.router.url);

      // find current collection from handle
      this.productServices.collections$.subscribe((res) => {
        if (res && res.length <= 0) return; // if res is null, return
        let collections = res.collection_listings;
        let collection = collections.find((collection: any) => collection.handle === this.handle);
        if (collection) {
          this.getRelatedProducts(collection.collection_id);
        } 
        else {
          // redirect to not found page
          this.router.navigate(['/not-found']);

          // scroll to top
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });

          return;
        }
      });
    }
  }

  // get related products from current collection
  getRelatedProducts(collection_id: number) {
    if (collection_id) {
      this.productServices.getProductsFromCollection(collection_id, 4).subscribe((res) => {
        let products = res.products;

        // remove current product from related products
        this.relatedProducts = products.filter((product: Product) => product.id !== this.product.id);
      });
    }
  }

  // redirect to product page
  goToProduct(product: Product) {
    this.router.navigate(['c',this.handle, 'p',product.handle], {
      state: { product }
    });

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
