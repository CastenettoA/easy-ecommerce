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


  // // get all collection details
  // getCollections(): Observable<{collection_listings: Collection[]}> {
  //   return this.http.get<{collection_listings: Collection[]}>(`https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev/collection_listings.json`)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }


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
  getProductDetails(prod_id: number | undefined): Observable<Product> {
    return this.http.get<Product>(`https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev/products/${prod_id}.json`)
      .pipe(
        catchError(this.handleError)
      )
  }



  // // save new poetry to the database
  // addPoetries(poetry:any): Observable<any> {
  //   // 1. send post request to node-poet server
  //   return this.http.post<any>('http://localhost:7000/poetries', poetry)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  // // get single poetries by _id or all poetries
  // getPoetries(_id?:string): Observable<Poetry[]> {
  //   if(_id) {
  //     // get single poetries
  //       return this.http.get<any>(`http://localhost:7000/poetries/${_id}`)
  //       .pipe(
  //         catchError(this.handleError)
  //       )
  //   } else {
  //     // get all poetries
  //       return this.http.get<any>('http://localhost:7000/poetries')
  //       .pipe(
  //         catchError(this.handleError)
  //       )
  //   }
  // }

  // // edit single poetry by _id
  // editPoetries(_id:string|undefined, body:Poetry): Observable<string> {
  //   return this.http.put<any>(`http://localhost:7000/poetries/${_id}`, body)
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  // }

  // deletePoetries(_id: string) {
  //   return this.http.delete<any>('http://localhost:7000/poetries/'+_id)
  //     .pipe(
  //       catchError(this.handleError)
  //     )
  // }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new Error('error in post request'))
    // todo: display an error with toast! (http interceptor?)
  }
}
