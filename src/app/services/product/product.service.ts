import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from '../../interfaces/product';
import { Collection } from '../../interfaces/collection';
import { ProductListing } from 'src/app/interfaces/product_listing';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _collections: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public collections$: Observable<any> = this._collections.asObservable();

  constructor(private http: HttpClient) {
    this.getCollections();
  }

  // get all collection details
  getCollections() {
    this.http.get<any>('https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev/collection_listings.json').pipe(
      tap((collections: { collection_listings: Collection[] }) => {
        this._collections.next(collections);
      })
    ).subscribe();
  }


  // get collection products by collection id
  getProductsFromCollection(coll_id: number | undefined, limit?: number): Observable<ProductListing> {

    let url = `https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev/collections/${coll_id}/products.json`;
    if (limit) {
      url = `https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev/collections/${coll_id}/products.json?limit=${limit}`;
    }

    return this.http.get<ProductListing>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  // get product details from product id
  getProductDetails(prod_id: number | undefined): Observable<{product: Product}> {
    return this.http.get<{product: Product}>(`https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev/products/${prod_id}.json`)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error('error in post request'))
    // todo: display an error with toast! (http interceptor?)
  }

  getCollectionHandle(url:string) {
    // c/jewely/p/necklaces
    // c/jewely?filter=price-desc
    // c/jewely
    let handle:any = url.split('?')[0]; // remove query string
    handle = handle.split('/')[2]; // get current url handle
    return handle;
  }
}
