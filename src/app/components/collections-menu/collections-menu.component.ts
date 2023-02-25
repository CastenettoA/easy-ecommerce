import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  collection_handle?: Collection["handle"];
  products?: Product[];

  constructor(private productServices: ProductService,
    private router: Router) {

    // get collections
    this.productServices.collections$.subscribe((res) => {
      this.collections = res.collection_listings;
    });
  }

  // redirect to collection page
  goToCollection(handle:string, id:number) {
    this.router.navigate([handle]);
  }

}
