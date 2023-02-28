import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs';
import { Collection } from 'src/app/interfaces/collection';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  currentPage = 1;
  itemsPerPage = 8;
  handle?: string;

  collections?: Collection[];
  currentCollection?: Collection;

  products_original?: any[]; // used to restore filter
  products?: any[];

  filtesSelect = new FormControl();

  constructor(private productServices: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    // save url handle 
    this.handle = this.productServices.getCollectionHandle(this.router.url);
  }

  ngOnInit() {
    this.filtesSelect.valueChanges.subscribe((value) => {
      this.orderProducts(value);
      this.setFilterQueryString(value); // set filter in url
    });

    // get collections on handle params change
    this.route.params.subscribe((params: Params) => {
      this.handle = params['handle']; // get current url handle      
      this.loadCurrentCollection(); // load current collection
    });

    this.route.queryParams.pipe(first()).subscribe(params => {
      this.currentPage = +params['page'] || 1; // get current page from url. + convert string to number
      this.filtesSelect.setValue(params['filter']); // get current filter from url
    });
  }

  loadCurrentCollection() {
    this.productServices.collections$.subscribe((res) => {
      if(res && res.length <= 0) return; // if res is null, return

      this.collections = res.collection_listings;

      // find current collection
      this.collections?.forEach((collection: Collection) => {
        if (collection.handle == this.handle) {
          this.currentCollection = collection;
        }
      });

      // go to 404 if collection not found
      if (!this.currentCollection) {
        this.router.navigate(['/not-found']);
        // scroll to top
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });

        return;
      }

      // get products from current collection
      this.productServices.getProductsFromCollection(this.currentCollection?.collection_id).subscribe((res) => {
        this.products = res.products;
        this.products_original = [...res.products];

        if (this.filtesSelect.value) {
          this.orderProducts(this.filtesSelect.value); // order products
        }
      });
    });
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: pageNumber },
      queryParamsHandling: 'merge'
    });
  }

  setFilterQueryString(filter?: string) {
    if (filter?.length) {
      // 
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter: filter },
        queryParamsHandling: 'merge'
      });
    }
  }

  // order products
  orderProducts(orderBy: string) {

    switch (orderBy) {
      case 'reset':
        let products_original_copy = this.products_original?.map(obj => ({ ...obj }));
        this.products = products_original_copy;
        break;

      case 'Alphabetic_ASC':
        this.products?.sort((a: Product, b: Product) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
        break;

      case 'Alphabetic_ASC':
        this.products?.sort((a: Product, b: Product) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
        break;

      case 'Alphabetic_DESC':
        this.products?.sort((a: Product, b: Product) => {
          if (a.title > b.title) { return -1; }
          if (a.title < b.title) { return 1; }
          return 0;
        });
        break;

      case 'Created_ASC':
        this.products?.sort((a: Product, b: Product) => {
          if (a.created_at < b.created_at) { return -1; }
          if (a.created_at > b.created_at) { return 1; }
          return 0;
        });
        break;

      case 'Created_DESC':
        this.products?.sort((a: Product, b: Product) => {
          if (a.created_at > b.created_at) { return -1; }
          if (a.created_at < b.created_at) { return 1; }
          return 0;
        });
        break
    }
  }

  getProductFromCollection(collection_id: number) {
    this.productServices.getProductsFromCollection(collection_id).subscribe((res) => {
      this.products = res.products;
    })
  }

  // redirect to product page
  goToProduct(product:Product) {

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
