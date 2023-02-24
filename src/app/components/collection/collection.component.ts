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

  colName = 'Nome-Collezione';
  collection_id?: number;

  products_original?: any[]; // used to restore filter
  products?: any[];
  
  filtesSelect = new FormControl();

  constructor(private productServices: ProductService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.queryParams.pipe(first()).subscribe(params => {
      this.currentPage = +params['page'] || 1; // get current page from url. + convert string to number
      this.filtesSelect.setValue(params['filter'] || 'reset'); // get current filter from url
    });

    this.route.params.subscribe((params: Params) => {

      // get all product from current collection
      this.collection_id = params['collection_id'];
      this.productServices.getProductsFromCollection(this.collection_id).subscribe((res) => {
        this.products = res.products;
        this.products_original = [...res.products];

        if(this.filtesSelect.value) {
          this.orderProducts(this.filtesSelect.value); // order products
        }
      });
    });
  }

  ngOnInit() {
    this.filtesSelect.valueChanges.subscribe((value) => {
      this.orderProducts(value);
      this.setFilterQueryString(value); // set filter in url
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

  setFilterQueryString(filter: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter: filter },
      queryParamsHandling: 'merge'
    });
  }

  // order products
  orderProducts(orderBy: string) {

    switch (orderBy) {
      case 'reset':
        let products_original_copy = this.products_original?.map(obj => ({ ...obj}));
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
  goToProduct(product_id: number) {
    this.router.navigate(['/collection', this.collection_id, product_id]);
  }
}
